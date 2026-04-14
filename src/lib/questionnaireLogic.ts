import type { Question, Answer, Section, QuestionnaireState } from '../types';

// 问卷逻辑类
export class QuestionnaireLogic {
	private sections: Section[];
	private answers: Answer[] = [];
	private currentQuestionId: string | null = null;

	constructor(sections: Section[]) {
		this.sections = sections;
		// 初始化第一个问题
		this.currentQuestionId = this.getFirstQuestionId();
	}

	// 获取第一个问题ID
	private getFirstQuestionId(): string | null {
		if (this.sections.length === 0) return null;
		if (this.sections[0].questions.length === 0) return null;
		return this.sections[0].questions[0].id;
	}

	// 获取当前问题
	getCurrentQuestion(): Question | null {
		if (!this.currentQuestionId) return null;

		for (const section of this.sections) {
			const question = section.questions.find(q => q.id === this.currentQuestionId);
			if (question) return question;
		}

		return null;
	}

	// 提交答案
	submitAnswer(questionId: string, value: any): boolean {
		const question = this.getQuestionById(questionId);
		if (!question) return false;

		// 验证必填项
		if (question.isMandatory && (!value || (Array.isArray(value) && value.length === 0))) {
			return false;
		}

		// 验证自定义规则
		if (question.validation) {
			const validationResult = question.validation(value);
			if (typeof validationResult === 'string') {
				// 验证失败
				return false;
			}
		}

		// 保存答案
		const existingAnswerIndex = this.answers.findIndex(a => a.questionId === questionId);
		if (existingAnswerIndex >= 0) {
			this.answers[existingAnswerIndex] = {
				questionId,
				value,
				isSkipped: false,
				timestamp: Date.now()
			};
		} else {
			this.answers.push({
				questionId,
				value,
				isSkipped: false,
				timestamp: Date.now()
			});
		}

		// 更新当前问题
		this.updateCurrentQuestion(question, value);
		return true;
	}

	// 跳过问题
	skipQuestion(questionId: string): boolean {
		const question = this.getQuestionById(questionId);
		if (!question) return false;

		// 不能跳過必填問題
		if (question.isMandatory) {
			return false;
		}

		// 保存跳过状态
		const existingAnswerIndex = this.answers.findIndex(a => a.questionId === questionId);
		if (existingAnswerIndex >= 0) {
			this.answers[existingAnswerIndex] = {
				questionId,
				value: null,
				isSkipped: true,
				timestamp: Date.now()
			};
		} else {
			this.answers.push({
				questionId,
				value: null,
				isSkipped: true,
				timestamp: Date.now()
			});
		}

		// 更新当前问题
		this.updateCurrentQuestion(question, null);
		return true;
	}

	// 更新当前问题
	private updateCurrentQuestion(question: Question, answer: any): void {
		if (question.nextId) {
			// 使用分支逻辑
			const nextId = question.nextId(answer);
			if (nextId) {
				this.currentQuestionId = nextId;
				return;
			}
		}

		// 按顺序获取下一个问题
		this.currentQuestionId = this.getNextQuestionId(question.id);
	}

	// 获取下一个问题ID
	private getNextQuestionId(currentQuestionId: string): string | null {
		let foundCurrent = false;

		for (const section of this.sections) {
			for (let i = 0; i < section.questions.length; i++) {
				if (foundCurrent) {
					return section.questions[i].id;
				}

				if (section.questions[i].id === currentQuestionId) {
					foundCurrent = true;
				}
			}
		}

		return null;
	}

	// 获取问题通过ID
	private getQuestionById(questionId: string): Question | null {
		for (const section of this.sections) {
			const question = section.questions.find(q => q.id === questionId);
			if (question) return question;
		}
		return null;
	}

	// 获取当前状态
	getState(): QuestionnaireState {
		return {
			answers: this.answers,
			currentQuestionId: this.currentQuestionId,
			progress: this.getProgress(),
			sections: this.sections
		};
	}

	// 计算进度
	getProgress(): number {
		const totalQuestions = this.sections.reduce((sum, section) => sum + section.questions.length, 0);
		if (totalQuestions === 0) return 0;

		const answeredQuestions = this.answers.length;
		return (answeredQuestions / totalQuestions) * 100;
	}

	// 获取指定部分的进度
	getSectionProgress(sectionId: string): number {
		const section = this.sections.find(s => s.id === sectionId);
		if (!section) return 0;

		const sectionQuestions = section.questions.length;
		if (sectionQuestions === 0) return 0;

		const answeredInSection = this.answers.filter(a => 
			section.questions.some(q => q.id === a.questionId)
		).length;

		return (answeredInSection / sectionQuestions) * 100;
	}

	// 导入状态
	importState(state: Partial<QuestionnaireState>): void {
		if (state.answers) {
			this.answers = state.answers;
		}
		if (state.currentQuestionId) {
			this.currentQuestionId = state.currentQuestionId;
		}
	}

	// 重置问卷
	reset(): void {
		this.answers = [];
		this.currentQuestionId = this.getFirstQuestionId();
	}
}