import useAxios from 'src/composables/useAxios';
import { ClIpd } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();
  const findIpds = async (): Promise<ClIpd> => {
    return await callAxios<ClIpd>({
      API: '/v1/cl-ipds',
      method: 'GET',
    });
  };

  return {
    findIpds,
  };
};
