export const getLocation = (): Promise<{ x: number, y: number }> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ x: latitude, y: longitude });
                },
                () => {
                    reject(new Error("No se pudo obtener la ubicación"));
                }
            );
        } else {
            reject(new Error("El navegador no soporta geolocalización"));
        }
    });
};

interface Location {
    x: number;
    y: number;
}

export const updateLocationInDatabase = async (userId: string, location: Location): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/saveLocation/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
    });

    if (!response.ok) {
        throw new Error('Error al guardar la ubicación');
    }

    return await response.json();
};
