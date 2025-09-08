import { useState } from "react";
import { useFaceApi } from "../hooks/useFaceApi";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const { videoRef, modelsLoaded } = useFaceApi();
  const [username, setUsername] = useState("");

  async function handleRegister() {
    if (!modelsLoaded || !videoRef.current) return;

    if (!username.trim()) {
      alert("Por favor, digite um nome de usuário!");
      return;
    }

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (!detection) {
      alert("Nenhum rosto detectado!");
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          descriptor,
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado!");
        setUsername(""); // Limpa o input após cadastro
      } else {
        alert("Erro ao realizar cadastro!");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Erro de conexão com o servidor!");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        width="320" 
        height="240" 
        className="rounded-xl shadow" 
      />
      
      <Input
        type="text"
        placeholder="Digite seu nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="max-w-sm"
      />
      
      <Button
        onClick={handleRegister}
        disabled={!username.trim() || !modelsLoaded}
      >
        Cadastrar Rosto
      </Button>
    </div>
  );
}