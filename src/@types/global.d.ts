export interface keyable {
  [key: string]: any;
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayjs: { format: any; readable: any };
  }
}
