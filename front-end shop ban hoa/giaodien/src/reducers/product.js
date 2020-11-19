var inittialState =[
    {
        id: 1,
        name:'Ipone 8 ',
        description: 'Sản phẩm do apple',
        price: 500,
        inventory: 10
    },
    {
        id: 2,
        name:'Ipone 10 ',
        description: 'Sản phẩm do apple',
        price: 500000,
        inventory: 10
    },
    {
        id: 3,
        name:'Ipone 9 ',
        description: 'Sản phẩm do apple',
        price: 5000,
        inventory: 10
    }
]

const products = (state = inittialState, action) =>{
    switch(action.type){
        default: return [...state];
    }
}

export default products;