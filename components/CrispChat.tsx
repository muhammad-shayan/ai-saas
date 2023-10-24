"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2dbf689a-95bc-4396-b829-6f2c308a7b90");
  }, []);
  return null;
};

export default CrispChat;
