import { Session, User } from '@supabase/supabase-js';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../supabaseClient';

//
export interface UrlQuery {
	query: ParsedUrlQuery;
}

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
	PUT = 'PUT'
}

export type ApiRequest = {
	host?: string;
	path: string;
	query?: any;
	body?: any;
};
export type ApiResponse<T = any> = ApiData<T> & ApiError;
export type ApiData<T = any> = {
	statusCode: number;
	body?: T;
};
export type ApiError = {
	statusCode: number;
	message?: string;
};

export default class ApiHelper {
	static isSuccess(response: ApiData | ApiError) {
		return response.statusCode >= 200 && response.statusCode < 300;
	}
	static Get<T = any>(request: ApiRequest, success: (data: ApiData<T>) => void, fail?: (error: ApiError) => void) {
		return this.Execute<T>(HttpMethod.GET, request, success, fail);
	}
	static async GetAsync<T = any>(request: ApiRequest, needLoading?: boolean) {
		return this.ExecuteAsync<T>(HttpMethod.GET, request, needLoading);
	}

	static Post<T = any>(request: ApiRequest, success: (data: ApiData<T>) => void, fail?: (error: ApiError) => void) {
		return this.Execute<T>(HttpMethod.POST, request, success, fail);
	}
	static async PostAsync<T = any>(request: ApiRequest) {
		return this.ExecuteAsync<T>(HttpMethod.POST, request);
	}
	static Patch<T = any>(request: ApiRequest, success: (data: ApiData<T>) => void, fail?: (error: ApiError) => void) {
		return this.Execute<T>(HttpMethod.PATCH, request, success, fail);
	}
	static async PatchAsync<T = any>(request: ApiRequest) {
		return this.ExecuteAsync<T>(HttpMethod.PATCH, request);
	}
	static Delete<T = any>(request: ApiRequest, success: (data: ApiData<T>) => void, fail?: (error: ApiError) => void) {
		return this.Execute<T>(HttpMethod.DELETE, request, success, fail);
	}
	static async DeleteAsync<T = any>(request: ApiRequest) {
		return this.ExecuteAsync<T>(HttpMethod.DELETE, request);
	}
	static Put<T = any>(request: ApiRequest, success: (data: ApiData<T>) => void, fail?: (error: ApiError) => void) {
		return this.Execute<T>(HttpMethod.PUT, request, success, fail);
	}
	static async PutAsync<T = any>(request: ApiRequest) {
		return this.ExecuteAsync<T>(HttpMethod.PUT, request);
	}

	private static Execute<T = any>(
		method: HttpMethod,
		request: ApiRequest,
		success: (data: ApiData) => void,
		fail?: (error: ApiError) => void
	) {
		const axiosRequest = {
			method: method,
			url: (request.host ?? '') + request.path,
			params: request.query,
			data: request.body,
			timeout: 60000
		};

		axios
			.request(axiosRequest)
			.then((response) => {
				success({
					statusCode: response.status,
					body: response.data
				} as ApiResponse<T>);
			})
			.catch((error: AxiosError) => {
				if (fail !== undefined) {
					const apiError: ApiError = {
						statusCode: 500,
						message: 'unknown error'
					};

					if (axios.isAxiosError(error)) {
						apiError.message = error.message;
						apiError.statusCode = error.response?.status ?? 404;
					}

					fail(apiError);
				}
			});
	}

	static async ExecuteAsync<T = any>(
		method: HttpMethod,
		request: ApiRequest,
		needLoading?: boolean
	): Promise<ApiResponse<T>> {
		const axiosRequest = {
			method: method,
			url: (request.host ?? '') + request.path,
			params: request.query,
			data: request.body,
			timeout: 60000
		};

		try {
			const response = await axios.request({
				method: method,
				url: (request.host ?? '') + request.path,
				params: request.query,
				data: request.body,
				timeout: 60000
			});

			if (response.status >= 200 && response.status < 300) {
				return {
					statusCode: response.status,
					body: response.data
				};
			} else {
				throw new AxiosError(response.statusText, undefined, undefined, axiosRequest, response);
			}
		} catch (error) {
			const apiError: ApiError = {
				statusCode: 500,
				message: 'unknown error'
			};

			if (axios.isAxiosError(error)) {
				apiError.message = error.message;
				apiError.statusCode = error.response?.status ?? 404;
			}

			return apiError;
		}
	}
}

export type HandlerArgs<Q = any, B = any> = {
	req: NextApiRequest;
	res: NextApiResponse;
	session: Session | null;
	user?: User;
	query: Q;
	body: B;
};
type QueryHandler = {
	(args: HandlerArgs): Promise<ApiData>;
};
type BodyHandler = {
	(args: HandlerArgs): Promise<ApiData>;
};

export interface ApiHandler {
	Get?: QueryHandler;
	Post?: BodyHandler;
	Patch?: BodyHandler;
	Put?: BodyHandler;
	Delete?: QueryHandler;
}

export async function RunApiHandler(req: NextApiRequest, res: NextApiResponse, apiHandler: ApiHandler) {
	let response: ApiResponse | undefined;

	const { data } = await supabase.auth.getSession();
	const session = data.session;

	if (req.method === 'GET' && apiHandler.Get) {
		response = await apiHandler.Get({ req, res, session, user: session?.user, query: req.query, body: undefined });
	}

	if (req.method === 'POST' && apiHandler.Post) {
		response = await apiHandler.Post({ req, res, session, user: session?.user, query: req.query, body: req.body });
	}

	if (req.method === 'PATCH' && apiHandler.Patch) {
		response = await apiHandler.Patch({ req, res, session, user: session?.user, query: req.query, body: req.body });
	}

	if (req.method === 'PUT' && apiHandler.Put) {
		response = await apiHandler.Put({ req, res, session, user: session?.user, query: req.query, body: req.body });
	}

	if (req.method === 'DELETE' && apiHandler.Delete) {
		response = await apiHandler.Delete({
			req,
			res,
			session,
			user: session?.user,
			query: req.query,
			body: undefined
		});
	}

	if (response) {
		if (response.statusCode >= 200 && response.statusCode < 300) {
			res.status(response.statusCode).json(response.body);
		} else {
			res.status(response.statusCode).json({ message: response.message ?? 'unknown error' });
		}
	} else {
		res.status(405).end();
	}
}
