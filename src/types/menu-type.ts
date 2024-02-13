type MenuProps = [
    {
      title: string,
      data: ProductProps[],
    }
]

type ProductProps = {
    id: string;
    title: string;
    price: number;
    description: string;
    cover: any;
    thumbnail: any;
    ingredients: string[];
}

export {MenuProps, ProductProps}