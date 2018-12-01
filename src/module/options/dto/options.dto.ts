export class OptionsDto {
  public _id?: string;
  public title?: string;
  public sub_title?: string;
  public keyword?: string;
  public descript?: string;
  public url?: string;
  public email?: string;
  public icp?: string;
  public meta?: {
    likes?: number;
  };
}
