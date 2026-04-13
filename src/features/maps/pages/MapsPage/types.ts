/** Location data model for the Maps page. */
export interface OfficeLocation {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly address: string;
  readonly phone: string;
  readonly hours: string;
  readonly employees: number;
  readonly type: string;
}
