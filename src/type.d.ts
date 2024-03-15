export interface Order {
    id: string;
    customer_name: string;
    customer_email: string;
    product: "Product 1" | "Product 2" | "Product 3";
    quantity: number;
    order_value: number;
  }
  
  export interface EditableOrder extends Order {
    editing?: boolean;
  }
  
  export interface NewOrder {
    id: string;
    customer_name: string;
    customer_email: string;
    product: "Product 1" | "Product 2" | "Product 3";
    quantity: number;
    order_value: number;
  }