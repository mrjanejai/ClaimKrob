import useAxios from '@/composables/useAxios';
export default () => {
  const { callAxios } = useAxios();
  const uploadApi = async (item: any): Promise<any> => {
    return await callAxios<any>({
      API: '/v1/cl-ipd-reps/receipt',
      method: 'POST',
      body: { data: item },
    });
  };

  return {
    uploadApi,
  };
};
