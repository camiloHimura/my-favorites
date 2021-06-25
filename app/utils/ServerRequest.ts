import { AxiosResponse } from 'axios';
import { iLink, iTag } from '../interfaces';
import { iNewLink } from '../interfaces/iLink';
import axiosInstance from './axios.conf';
import catchError from './CatchError';

type appPromise<T> = Promise<{ status: string; data: T }>;
type appPromiseStatus = Promise<{ status: string }>;

const promiseWrapper = (flatPromise: Promise<AxiosResponse>) =>
  Promise.resolve(flatPromise)
    .then(({ data }) => data)
    .catch(catchError);

export const getLinks = (): Promise<iLink[]> => promiseWrapper(axiosInstance.get('/link'));

export const getTags = (): Promise<iTag[]> => promiseWrapper(axiosInstance.get('/tag'));

export const createTag = async (info: iTag): appPromise<iTag> =>
  promiseWrapper(axiosInstance.put('/tag', info));

export const updateTagRequest = async (id: string, name: string): appPromise<iTag> =>
  promiseWrapper(axiosInstance.put(`/tag/${id}`, { name }));

export const deleteTag = async (id: string): appPromiseStatus =>
  promiseWrapper(axiosInstance.delete(`/tag/${id}`));

export const getLinksByTags = (tags: string): Promise<iLink[]> =>
  promiseWrapper(axiosInstance.get(`/link/byTags/${tags}`));

export const createLink = (info: iNewLink): appPromise<iLink> =>
  promiseWrapper(axiosInstance.put('/link', info));

export const removeLinkRequest = (id: string): appPromiseStatus =>
  promiseWrapper(axiosInstance.delete(`/link/${id}`));

export const removeTagLinkRequest = (linkID: string, tagID: string): appPromiseStatus =>
  promiseWrapper(axiosInstance.put(`/link/${linkID}/${tagID}`));
