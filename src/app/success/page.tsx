"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SubscriptionSuccess = () => {
	const searchParams = useSearchParams();
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const session_id = searchParams.get("session_id");
		if (session_id) {
			setSessionId(session_id);
		}
	}, [searchParams]);

	useEffect(() => {
		if (!sessionId) return;

		const completeSubscription = async () => {
			try {
				setLoading(true);

				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/subscribe/success/${sessionId}`, {
					method: "POST",
				});

				if (response.ok) {
					setSuccess(true);
				} else {
					const data = await response.json();
					setError(data.message || "Hubo un error al procesar tu suscripción.");
				}
			} catch {
				setError("Hubo un error en la conexión con el servidor.");
			} finally {
				setLoading(false);
			}
		};

		completeSubscription();
	}, [sessionId]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
			<Image src="/favicon.ico" alt="snappy" width={150} height={150} />

			<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-8 text-center">
				{loading
					? "Verificando tu pago..."
					: success
					? "¡Pago Exitoso!"
					: "Error en la suscripción"}
			</h1>

			{loading ? (
				<p className="text-gray-600 mt-4 text-center">
					Por favor, espera mientras verificamos tu pago.
				</p>
			) : success ? (
				<p className="text-gray-600 mt-4 text-center">
					¡Gracias por suscribirte a Snappy Friends! Ahora eres parte de nuestra
					comunidad premium. Con tu membresía tendrás acceso a una insignia
					especial que te distinguirá.
				</p>
			) : (
				<p className="text-red-600 mt-4 text-center">{error}</p>
			)}

			<Link
				href="/"
				className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
			>
				Volver al inicio
			</Link>
		</div>
	);
};

export default function SubscriptionSuccessPage() {
	return (
		<Suspense fallback={<div>Cargando...</div>}>
			<SubscriptionSuccess />
		</Suspense>
	);
}