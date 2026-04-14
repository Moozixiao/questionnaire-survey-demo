import { loadingStore } from '../stores/loadingStore';
import type { ApiResponse, QuestionnaireState, ReportData, User } from '../types';

// API基础URL
const API_BASE_URL = '/api';

// 通用请求方法
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
	loadingStore.show('加载中...');
	
	try {
		const response = await fetch(`${API_BASE_URL}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		console.error('API request failed:', error);
		throw error;
	} finally {
		loadingStore.hide();
	}
}

// 问卷相关API
export const questionnaireApi = {
	// 获取问卷数据
	async getQuestionnaire(sectionId: string): Promise<QuestionnaireState> {
		return request<QuestionnaireState>(`/questionnaire/${sectionId}`);
	},

	// 提交答案
	async submitAnswer(questionId: string, answer: any): Promise<ApiResponse<QuestionnaireState>> {
		return request<ApiResponse<QuestionnaireState>>('/questionnaire/answer', {
			method: 'POST',
			body: JSON.stringify({ questionId, answer }),
		});
	},

	// 跳过问题
	async skipQuestion(questionId: string): Promise<ApiResponse<QuestionnaireState>> {
		return request<ApiResponse<QuestionnaireState>>('/questionnaire/skip', {
			method: 'POST',
			body: JSON.stringify({ questionId }),
		});
	},

	// 获取进度
	async getProgress(): Promise<ApiResponse<{ progress: number }>> {
		return request<ApiResponse<{ progress: number }>>('/questionnaire/progress');
	},
};

// 报告相关API
export const reportApi = {
	// 生成报告
	async generateReport(): Promise<ReportData> {
		return request<ReportData>('/report/generate');
	},

	// 导出PDF
	async exportPDF(): Promise<Blob> {
		loadingStore.show('导出PDF中...');
		
		try {
			const response = await fetch(`${API_BASE_URL}/report/export/pdf`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.blob();
		} catch (error) {
			console.error('PDF export failed:', error);
			throw error;
		} finally {
			loadingStore.hide();
		}
	},

	// 导出Excel
	async exportExcel(): Promise<Blob> {
		loadingStore.show('导出Excel中...');
		
		try {
			const response = await fetch(`${API_BASE_URL}/report/export/excel`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.blob();
		} catch (error) {
			console.error('Excel export failed:', error);
			throw error;
		} finally {
			loadingStore.hide();
		}
	},
};

// 用户相关API
export const userApi = {
	// 获取用户信息
	async getUserInfo(): Promise<User> {
		return request<User>('/user/info');
	},

	// 更新用户信息
	async updateUserInfo(userInfo: Partial<User>): Promise<ApiResponse<User>> {
		return request<ApiResponse<User>>('/user/update', {
			method: 'PUT',
			body: JSON.stringify(userInfo),
		});
	},
};

// 系统相关API
export const systemApi = {
	// 获取系统状态
	async getSystemStatus(): Promise<ApiResponse<{ status: string; version: string }>> {
		return request<ApiResponse<{ status: string; version: string }>>('/system/status');
	},

	// 保存草稿
	async saveDraft(data: any): Promise<ApiResponse<{ success: boolean }>> {
		return request<ApiResponse<{ success: boolean }>>('/system/draft', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	},
};

// 导出所有API
export default {
	questionnaire: questionnaireApi,
	report: reportApi,
	user: userApi,
	system: systemApi,
};