// 问卷问题类型
export interface Question {
	id: string;
	section: string;
	text: string;
	type: 'single' | 'multi' | 'text' | 'boolean' | 'date' | 'file';
	options?: string[];
	isMandatory: boolean;
	nextId?: (answer: any) => string | null; // 动态分支函数
	defaultAnswer?: any;
	validation?: (answer: any) => boolean | string; // 自定义校验
}

// 问卷答案类型
export interface Answer {
	questionId: string;
	value: any;
	isSkipped: boolean;
	timestamp: number;
}

// 问卷模块类型
export interface Section {
	id: string;
	title: string;
	questions: Question[];
}

// 问卷状态类型
export interface QuestionnaireState {
	answers: Answer[];
	currentQuestionId: string | null;
	progress: number;
	sections: Section[];
}

// 报告数据类型
export interface ReportData {
	technicalComplexity: number[];
	featureDistribution: {
		name: string;
		value: number;
	}[];
	riskLevel: number[];
	summary: {
		section: string;
		questions: {
			id: string;
			text: string;
			answer: any;
			isSkipped: boolean;
		}[];
	}[];
}

// 用户类型
export interface User {
	id: string;
	name: string;
	role: string;
	avatar: string;
}

// API响应类型
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}