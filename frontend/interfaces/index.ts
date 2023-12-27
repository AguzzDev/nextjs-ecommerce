import { AxiosResponse } from "axios";
import { FieldAttributes } from "formik";
import {
  ReactNode,
  SVGProps,
  SetStateAction,
  Dispatch as DispatchReact,
  MouseEvent,
} from "react";
import { NavigationProps } from "react-hooks-helper";
import { Dispatch as DispatchRedux } from "redux";

export interface AppInterface {
  Component: React.FC;
  pageProps: Record<string, any>;
}

export type ChildrenType = JSX.Element | JSX.Element[];

export interface ProvidersFCInterface {
  components: React.FC<any>[];
  children: ReactNode;
}

export interface LayoutInterface {
  children: ChildrenType;
  props?: string;
  sectionProps?: string;
  title: string;
}

export interface ApiActions {
  setHistory(id: string): Promise<AxiosResponse<any>>;
  getHistoryUser(): Promise<AxiosResponse<any>>;
  userRegister(values: any): Promise<AxiosResponse<any>>;
  userLogin(values: any): Promise<AxiosResponse<any>>;
  forgetPassword(email: string): Promise<AxiosResponse<any>>;
  changePassword(param: string, values: any): Promise<AxiosResponse<any>>;
  getProduct(slug: string): Promise<AxiosResponse<ProductInterface>>;
  getAllProducts(): Promise<AxiosResponse<ProductInterface[]>>;
  createPayment(): Promise<AxiosResponse<any>>;
  getPaymentOrder(): Promise<AxiosResponse<any>>;
  getCart(): Promise<AxiosResponse<any>>;
  addToCart(
    id: string,
    product: ProductOptionsValuesInterface
  ): Promise<AxiosResponse<any>>;
  removeItemCart(id: string): Promise<AxiosResponse<any>>;
  deleteCart(): Promise<AxiosResponse<any>>;
  getFavourite(): Promise<AxiosResponse<any>>;
  addFavourite(id: string): Promise<AxiosResponse<any>>;
  removeFavourite(id: string): Promise<AxiosResponse<any>>;
  getAllOrders(): Promise<AxiosResponse<any>>;
}

export interface PurchaseStatusInterface {
  [key: string]: PurchasePathOptions;
}
interface PurchasePathOptions {
  title: string;
  message: JSX.Element | string;
}

export interface FiltersDataInterface {
  id: string;
  name: string;
  options: Array<{ value: string; label: string }>;
}

//hoc
interface ActionProps {
  name: string;
}
export interface ActionsHOCType {
  actions:
    | (() => (dispatch: DispatchRedux) => Promise<void>)
    | (() => (dispatch: DispatchRedux) => Promise<void>)[];
}

//reducers
export interface ActionReducerInterface {
  type: string;
  payload?: any;
}
export interface ProductReducerStateInterface {
  products: { items: ProductInterface[] | []; length: Number };
  product: ProductInterface | null;
  isLoading: boolean;
}
export interface AuthReducerStateInterface {
  user: UserInterface | null;
}
export interface CartReducerStateInterface {
  products: ProductInterface[] | [];
  total: number;
}
export interface FavouriteReducerStateInterface {
  favourite: ProductInterface[] | [];
}
export interface HistoryReducerStateInterface {
  history: ProductInterface[] | [];
}
export interface OrderReducerStateInterface {
  orderId: string | null;
  orders: OrderInterface[] | [];
  completed: boolean;
}

//objects
export interface ProductInterface {
  readonly _id: string;
  title: string;
  slug: string;
  desc: string;
  img: Array<string>;
  categories: Array<string>;
  size: Array<string>;
  color: Array<string>;
  price: number;
  quantity: number;
  cartId?: string;
}
export interface UserInterface {
  name: string;
  surname: string;
  email: string;
  cart: {
    products:
      | [
          {
            id: string;
            quantity: number;
            price: number;
          }
        ]
      | [];
    total: number;
  };
  location: {
    address: string;
    address_number: number;
    city: string;
    province: string;
    country: string;
    postal_code: string;
  };
  favourite: ProductInterface[] | [];
  accessToken: string;
}
export interface RegisterProps {
  name: string;
  surname: string;
  email: string;
  address: string;
  address_number: number;
  city: string;
  country: string;
  province: string;
  postal_code: number;
  password: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface HistoryInterface {
  userId: string;
  item: Array<{ historyId: string }>;
}
export type DispatchStateBoolean = DispatchReact<SetStateAction<boolean>>;
export interface OrderInterface {
  orderId: string;
  userId: string; //ref to user
  products: ProductInterface[]; //ref to products
  location: {
    address: string;
    address_number: string;
    postal_code: string;
  };
  status: string;
  sending: boolean;
  total: number;
  createdAt: Date;
}
export interface PaymentInterface {
  orderId?: string;
  title: string;
  step: string;
}

//enums
export const enum ActionTypeEnum {
  LOADING_FALSE = "LOADING_FALSE",
  LOADING_TRUE = "LOADING_TRUE",
  USER_REGISTER = "USER_REGISTER",
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  GET_USER = "GET_USER",
  GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS",
  GET_PRODUCT = "GET_PRODUCT",
  ADD_TO_CART = "ADD_TO_CART",
  GET_USER_CART = "GET_USER_CART",
  REMOVE_ITEM_CART = "REMOVE_ITEM_CART",
  DELETE_CART = "DELETE_CART",
  ADD_FAVOURITE = "ADD_FAVOURITE",
  GET_FAVOURITE = "GET_FAVOURITE",
  REMOVE_FAVOURITE = "REMOVE_FAVOURITE",
  SEND_ORDER = "SEND_ORDER",
  GET_ALL_ORDERS = "GET_ALL_ORDERS",
  SET_HISTORY = "SET_HISTORY",
  GET_HISTORY_USER = "GET_HISTORY_USER",
}

export enum TitleFilterEnum {
  "Todos",
  "Últimos 30 dias",
  "Más de 3 meses",
  "Más de 6 meses",
  "Más de 12 meses",
}

//components
export interface AllStepsInterface {
  address: string;
  city: string;
  country: string;
  province: string;
  postal_code: string;
  sending: boolean;
  sendingPrice: string;
  iva: string;
}
export interface StepInterface {
  navigation?: NavigationProps;
  stepId: string;
  formData: AllStepsInterface;
  setFormData?: DispatchReact<SetStateAction<AllStepsInterface>>;
}
export interface StepAsideInterface extends StepInterface {
  cart: CartReducerStateInterface;
  orderId?: string;
}
export interface StepHeader {
  title: string;
  num: string;
  value: string;
  act: string;
}
export interface BarStyleProps {
  [key: string]: string;
}
export interface SliderInterface {
  title?: string;
  products: ProductInterface[];
}
export interface SliderDetailsInterface {
  img: string[];
  updateSlide: ({ currentSlide }: { currentSlide: number }) => void;
}
export interface IconInterface {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  props?: string;
}
export interface FilterCatalogueInterface {
  query: string;
  sort: {
    label: string;
    value: string;
  };
  category: {
    label: string;
    value: string | null;
  };
  color: {
    label: string;
    value: string | null;
  };
}
export interface ProductOptionsValuesInterface {
  size: string | null;
  quantity: number | null;
  color: string | null;
}
export interface TagInterface {
  field: string;
  value: { label: string; value: string | null };
}
export interface PaymentInterface {
  title: string;
  step: string;
}
export interface CatalogueNavbarInterface {
  setFilter: DispatchReact<SetStateAction<FilterCatalogueInterface>>;
  setOperationType: DispatchReact<SetStateAction<string | null>>;
}
export interface SearchInputInterface {
  setFilter: DispatchReact<SetStateAction<FilterCatalogueInterface>>;
  setOperationType: DispatchReact<SetStateAction<string | null>>;
}
export interface DisclosureCategoryInterface extends CatalogueNavbarInterface {
  section: FiltersDataInterface;
}
export interface DisclosureProductsInterface {
  title: string | number;
  data: string[] | number[];
  handle: (value: string | number) => void;
}
export interface DropdownFilterOrdersInterface {
  filterValue: number;
  toogleActive: () => void;
  active: boolean;
  setFilterValue: DispatchReact<SetStateAction<number>>;
}
export interface ProductsItemsInterface {
  product: ProductInterface;
  i: number;
  id: string;
}
export interface ButtonFavouriteInterface {
  data: string;
  id: string;
}
export interface FilterOrdersInterface {
  values: OrderInterface;
  i: number;
}
//events
export type ClickEventType = MouseEvent<HTMLButtonElement>;

//forms
export interface SelectBoxInterface extends FieldAttributes<any> {
  name: string;
  placeholder?: string;
  options: {
    id: number;
    value: string;
    text: string;
  }[];
  searchProvince?: Function;
}
