export type User = {
    id: string;
    name: string;
    username: string;
    private: boolean;
    latitude: number;
    longitude: number;
    platforms: { [key: string]: Array<any> };
    contacts: Array<any>;
    messages: { [key: string]: Array<any> };
    notifications: Array<any>;
  };
  
  export type Users = [
    {
      id: string;
      name: string;
      username: string;
      private: boolean;
      latitude: number;
      longitude: number;
      platforms: { [key: string]: Array<any> };
      contacts: Array<any>;
      messages: { [key: string]: Array<any> };
      notifications: Array<any>;
    }
  ];
  