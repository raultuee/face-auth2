import { Button } from "@/components/ui/button";
import { useFaceApi } from "../hooks/useFaceApi";
import * as faceapi from "face-api.js";

export default function Login() {
  const { videoRef, modelsLoaded } = useFaceApi();

  async function handleLogin() {
    if (!modelsLoaded || !videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (!detection) {
      alert("Nenhum rosto detectado!");
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descriptor }),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Login bem-sucedido! Usuário: " + data.user);
    } else {
      alert("Falha no login!");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay muted width="320" height="240" className="rounded-xl shadow" />
      <Button
        onClick={handleLogin}
      >
        Fazer Login
      </Button>
    </div>
  );
}
