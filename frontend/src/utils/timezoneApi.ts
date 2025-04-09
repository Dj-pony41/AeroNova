// src/utils/timezoneApi.ts

export async function obtenerZonaHoraria(lat: number, lng: number): Promise<string | null> {
    const apiKey = "4T5lFEW9GFE9J"; // ← tu clave real
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "OK") {
            return data.zoneName; // <-- CAMBIADO
        } else {
            console.error("Error en TimeZoneDB:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Fallo la conexión a TimeZoneDB:", error);
        return null;
    }
}
