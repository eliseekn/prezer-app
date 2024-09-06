export type NavigationStack = {
    OnBoarding: undefined
    TabStack: undefined
    HomeScreen: undefined
    ShopStack: undefined
    CartStack: undefined
    ShopsScreen: undefined
    CategoriesScreen: {shopId: number}
    ProductsScreen: {categoryId?: number; searchQuery?: string}
    ProductDetailsScreen: {productId: number}
    FiltersScreen: undefined
    CartScreen: undefined
    CheckoutScreen: undefined
    HomeStack: undefined
    OrderStatusScreen: {status: StatusType}
}

export type CategoryItemType = {
    id: number
    name: string
    image: string
    shop?: ShopType
    products?: CategoryItemType[]
}

export type CategoryType = {
    items: CategoryItemType[]
    meta: {
        totalItems: number
        itemCount: number
        itemsPerPage: number
        totalPages: number
        currentPage: number
    }
    links: {
        first: string
        previous: string
        next: string
        last: string
    }
}

export type ProductImageType = {
    id: number
    photo: string
}

export type ProductItemType = {
    id: number
    name: string
    price: number
    description: string
    category: CategoryItemType
    productImages: ProductImageType[]
}

export type ProductType = {
    items: ProductItemType[]
    meta: {
        totalItems: number
        itemCount: number
        itemsPerPage: number
        totalPages: number
        currentPage: number
    }
    links: {
        first: string
        previous: string
        next: string
        last: string
    }
}

export type ShopItemType = {
    id: number
    shopName: string
    shopSlogan: string
    email: string
    contact: string
    description: string
    shopOwner: number
    shopManagerContact: string
    shopOwnerContact: string
    status: number
    logo: string
    isValid: boolean
    createdAt: Date
}

export type ShopType = {
    items: ShopItemType[]
    meta: {
        totalItems: number
        itemCount: number
        itemsPerPage: number
        totalPages: number
        currentPage: number
    }
    links: {
        first: string
        previous: string
        next: string
        last: string
    }
}

export type CartItemType = {
    id: number
    quantity: number
    product: ProductItemType
}

export type StatusType = 'success' | 'error' | 'network-error'
