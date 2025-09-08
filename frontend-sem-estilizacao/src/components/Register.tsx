import { useFaceApi } from "../hooks/useFaceApi";
import * as faceapi from "face-api.js";
import { Button } from "./ui/button";

export default function Register() {
  const { videoRef, modelsLoaded } = useFaceApi();

  async function handleRegister() {
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

    await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "raul",
        descriptor,
      }),
    });

    alert("Cadastro realizado!");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay muted width="320" height="240" className="rounded-xl shadow" />
      <Button
        onClick={handleRegister}
        className=""
      >
        Cadastrar Rosto
      </Button>
    </div>
  );
}
