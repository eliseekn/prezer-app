export const themeColors = {
    blue: '#0140A6',
    dark: '#303733',
    black: '#293041',
    soft: '#7D8FAB',
    accent: '#511283',
    grey: '#E8EFF3',
}

export const themeFonts = {
    Poppins: 'Poppins_400Regular',
    PoppinsBold: 'Poppins_700Bold',
    Lato: 'Lato_400Regular',
    LatoBold: 'Lato_700Bold',
}

export const truncate = (str: string, length: number) => {
    return str.length > length ? str.slice(0, length - 1) + '...' : str
}

export const formatPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
})

export const fetchApi = async (method: string, url: string, options: any = {}): Promise<Response> => {
    return fetch(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}/${url}`, {
        method: method,
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json; charset=UTF-8',
            Origin: `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}`,
            ...options.headers,
        },
    })
}
