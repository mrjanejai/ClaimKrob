export type IPlatForm = 1 | 2 | 3; // 1=web, 2=ios, 3=android
export type IPermissionOperationType = 1 | 2 | 3; // 1=crud, 2=report, 3=other
export type ICompanyPostLevel = 1 | 2; //1: By organization hierarchy , 2: public all user can view all post
export type IResetPrizeType = 1 | 2 | 3; //1: 1 week, 2: 2 weeks, 3: 1 month
export type IDeLogPeriodType = 1 | 2; //1: week, 2: 1 month
export type FormQuestionType =
  | 'TITLE'
  | 'FREE_TEXT'
  | 'FREE_TEXT_SHORT'
  | 'ROW_COLUMN'
  | 'LINEAR_SCALE'
  | 'RADIO'
  | 'DATE'
  | 'TIME'
  | 'FILE'
  | 'YOUTUBE_LINK'
  | 'MAP_LAT_LNG'; //0: TITLE, 1: FREE_TEXT,2: FREE_TEXT, 3: ROW_COLUMN,4: LINEAR_SCALE,5: RADIO,6: DATE,7: TIME,8: FILE,9: YOUTUBE_LINK,10: MAP_LAT_LNG,
export type PostActionType =
  | 'LOVE_IT'
  | 'PRIZE_IT'
  | 'ADOPT_IT'
  | 'ACTION_IT'
  | 'SHARE_IT'
  | 'COMMENT_IT';
export type PostSortType = 'NEW_POST' | 'NEW_ACTIVITY' | 'TOP_POST';
export type CommentSortType = 'ALL_COMMENT' | 'NEW_COMMENT' | 'TOP_COMMENT';
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface ImageDto {
  index?: number;
  id?: number;
  image: string;
  thumbnail: string;
}
export interface CompanyDto {
  id: number;
  name: string;
  nameEn?: string;
  address?: string;
  mobileNo?: string;
  faxNo?: string;
  numberOfUser?: string;
  startDate?: string;
  expireDate?: string;
  needVerifyPost?: string;
  companyLogo?: ImageDto;
  resetPrizePeriod: number;
  deLogPeriod: number;
  postLevel: number;
  upgradeLevelMonthCheck: number;
  upgradeCriteriaCheck: number;
  companyTypeId: number;
}

export interface AuthenticationResponse {
  authenticationToken: string | null;
  refreshToken: string | null;
  expiresAt: string;
  email: string | null;
  username?: string;
  avatar: ImageDto;
  company?: CompanyDto;
}
export interface UserDataDto {
  id: number;
  acumulatePrize: number;
  employeeId?: string;
  fullName?: string;
  onlyReviewOrganization?: boolean;
  priceQuota?: number;
  reviewPost: boolean;
  reviewUser: boolean;
  specialPriceQuota: number;
  companySelected?: number;
}
export interface UserDto {
  id?: number | null;
  email: string;
  username?: string | null;
  password?: string | null;
  token?: string;
  avatarFileId?: number;
  coverFileId?: number;
  avatar?: ImageDto | null;
  cover?: ImageDto | null;
  active: boolean;
  userData: UserDataDto | null;
  company?: CompanyDto | null;
  selectedRoles?: number[];
}

// export interface LoginParamRequest {
//   [key: string]: {
//     email: string | null;
//     password: string | null;
//     loginForm: IPlatForm;
//   };
// }
export interface LoginRequest {
  username: string | null;
  password: string | null;
}
export interface LoginRequest2 {
  username?: string | null;
  password?: string | null;
}
export interface RefreshTokenRequest {
  refreshToken: {
    refreshToken?: string | null;
    email?: string | null;
  };
}
export interface UserChangePasswordRequest {
  userChangePasswordRequest: {
    password: string;
    newPassword: string;
    logoutAllDevice: boolean;
  };
}
export interface RefreshTokenResponse {
  token: string;
  servicePoints: any;
}
export interface FileManagerDto {
  id: number;
  fileMime: string;
  fileName: string;
  filePath: string;
  fileThumbnailPath: string;
  fileSize: string;
}
export interface AccessTokenDto {
  id: number;
  ipAddredd: string;
  hostName: string;
  agent: string;
  loginPlatform: number;
  activeNow: boolean;
  createdDate: string;
  lastestActive: string;
}
export interface IMenuPageItem {
  iconText?: string;
  color?: string;
  icon?: string;
  to?: string;
  title?: string;
  permission?: string;
  border?: boolean;
  noActiveLink?: boolean;
}
export interface IMenuPage extends IMenuPageItem {
  items?: IMenuPageItem[];
}
export interface IMenu {
  pages?: IMenuPage[];
  header?: string;
  border?: true;
}
export interface IAcl {
  menus: IMenu[];
  permissions: string[];
}

export interface Permission {
  id: number | null;
  code: string;
  remark?: string | null;
  description?: string | null;
  operationType: IPermissionOperationType;
  frontEnd?: boolean;
}
export interface PermissionRequest {
  [key: string]: Permission;
}

export interface IFormPostType {
  label: string;
  value: FormQuestionType;
  icon: string;
}
export interface Hashtag {
  id: number;
  name: string;
}
export interface PostReference {
  name: string;
  activity: string;
  activityIcon: string;
}
export interface PostData {
  id: number;
  pin: boolean;
  postDatetime: string;
  valid?: boolean;
  cardFormId?: number;
  companyChallengeId?: number;
  organizationId?: number;
  appUserId?: number;
  content: string;
  reference?: PostReference;
  gallery: ImageDto[];
  hashtag: Hashtag[];
}
export interface OgMeta {
  domain: string;
  url: string;
  title?: string;
  desc?: string;
  image?: string;
  imageAlt?: string;
}
export interface ExcelRep {
  repno: string;
  no?: string;
  tran_id?: string;
  hn?: string;
  an: string;
  pid?: string;
  fullname?: string;
  pttype?: string;
  visitdate?: string;
  dchdate?: string;
  total_nhso_pay?: string;
  total_agency_pay?: string;
  compen_from?: string;
  error_code?: string;
  main_funds?: string;
  sub_funds?: string;
  type_service?: string;
  referin?: string;
  has_pttype?: string;
  use_pttype?: string;
  chk?: string;
  hosmain?: string;
  subhos?: string;
  href?: string;
  hcode?: string;
  hmain?: string;
  prov1?: string;
  rg1?: string;
  hmain2?: string;
  prov2?: string;
  rg2?: string;
  dmis_hmain3?: string;
  da?: string;
  proj?: string;
  pa?: string;
  drg?: string;
  rw?: string;
  ca_type?: string;
  non_car_drg_ins?: string;
  car_drg_ins?: string;
  total_charge?: string;
  central_reimburse?: string;
  payment?: string;
  point?: string;
  delay_num?: string;
  delay_per?: string;
  ccuf?: string;
  adjrw_nhso?: string;
  adjrw2?: string;
  compensate?: string;
  act?: string;
  salary?: string;
  total_salary?: string;
  total_salary_cut?: string;
  iphc?: string;
  ophc?: string;
  opae?: string;
  ae_ipnb?: string;
  ae_ipuc?: string;
  ae_ip3sss?: string;
  ae_ip7sss?: string;
  ae_carae?: string;
  ae_caref?: string;
  ae_caref_puc?: string;
  opinst?: string;
  inst?: string;
  ipaec?: string;
  ipaer?: string;
  ipinrgc?: string;
  ipinrgr?: string;
  ipinspsn?: string;
  ipprcc?: string;
  ipprcc_puc?: string;
  ipbkk_inst?: string;
  ip_ontop?: string;
  dmis_cataract?: string;
  dmis_ssj?: string;
  dmis_hos?: string;
  dmis_catinst?: string;
  dmis_dmisrc?: string;
  dmis_dmisrc2?: string;
  dmis_rcuhosc?: string;
  dmis_rcuhosc2?: string;
  dmis_rcuhosr?: string;
  dmis_rcuhosr2?: string;
  dmis_llop?: string;
  dmis_llrgc?: string;
  dmis_llrgr?: string;
  dmis_lp?: string;
  dmis_stroke_stemi_drug?: string;
  dmis_dmidml?: string;
  dmis_pp?: string;
  dmis_dmishd?: string;
  dmis_dmicnt?: string;
  dmis_paliative_care?: string;
  dmis_dm?: string;
  drug?: string;
  opbkk_hc?: string;
  opbkk_dent?: string;
  opbkk_drug?: string;
  opbkk_fs?: string;
  opbkk_others?: string;
  deny_hc?: string;
  deny_ae?: string;
  deny_inst?: string;
  deny_ip?: string;
  deny_dmis?: string;
  base_rate?: string;
  base_rate_extra?: string;
  base_rate_total?: string;
  fs?: string;
  va?: string;
  remark?: string;
}

export interface ClIpd {
  an?: any;
  admdoctor?: any;
  dchdate?: any;
  dchstts?: any;
  dchtime?: any;
  dchtype?: any;
  dthdiagdct?: any;
  hn?: any;
  ivstist?: any;
  ivstost?: any;
  lockdx?: any;
  prediag?: any;
  pttype?: any;
  regdate?: any;
  regtime?: any;
  rfrics?: any;
  rfrilct?: any;
  rfrocs?: any;
  rfrolct?: any;
  spclty?: any;
  vn?: any;
  ward?: any;
  rcpt_disease?: any;
  dch_doctor?: any;
  ipt_type?: any;
  iref_type?: any;
  ipacc?: any;
  act_money_limit?: any;
  drg?: any;
  mdc?: any;
  rw?: any;
  wtlos?: any;
  ot?: any;
  result?: any;
  gravidity?: any;
  parity?: any;
  living_children?: any;
  rxdoctor?: any;
  staff?: any;
  bw?: any;
  first_ward?: any;
  refer_out_number?: any;
  incharge_doctor?: any;
  an_guid?: any;
  an_lock?: any;
  ergent?: any;
  chart_state?: any;
  receive_chart_date_time?: any;
  receive_chart_staff?: any;
  receive_chart_note?: any;
  adjrw?: any;
  ipt_spclty?: any;
  finance_lock?: any;
  last_check_autoincome?: any;
  admit_fee_guid?: any;
  leave_home_day?: any;
  operation_status?: any;
  finance_summary_date?: any;
  estimate_discharge_date?: any;
  old_cause_revisit?: any;
  finance_transfer?: any;
  provision_dx?: any;
  dw_hhc_list_id?: any;
  hos_guid?: any;
  hos_guid_ext?: any;
  body_height?: any;
  update_datetime?: any;
  cur_dep_code?: any;
  finance_status_flag?: any;
  ipt_admit_type_id?: any;
  no_visit?: any;
  no_food?: any;
  confirm_discharge?: any;
  lab_status?: any;
  xray_status?: any;
  grouper_version?: any;
  grouper_err?: any;
  grouper_warn?: any;
  grouper_actlos?: any;
  auto_charge_amount?: any;
  provision_dx_icd?: any;
  ipt_cause_type_id?: any;
  ipt_severe_type_id?: any;
  ipt_cause_type_note?: any;
  followup?: any;
  dch_severe_type_id?: any;
  opd_finance_wait_tr?: any;
  home_leave_status?: any;
  grouper_adjrw_price?: any;
  reimburse_price?: any;
  oldcode?: any;
  data_ok?: any;
  data_exp_date?: any;
  ipt_summary_status_id?: any;
  no_charge_room?: any;
  rx_home_med?: any;
  hhc_hospcode?: any;
  operation_status_id?: any;
  ipd_nurse_eval_range_code?: any;
}
