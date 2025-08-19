import { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  Leaf,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Progress } from "@radix-ui/themes";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../services/auth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { label: "Mínimo 6 caracteres", met: formData.password.length >= 6 },
    { label: "Pelo menos uma letra", met: /[a-zA-Z]/.test(formData.password) },
    { label: "Pelo menos um número", met: /\d/.test(formData.password) },
  ];

  const passwordStrength = passwordRequirements.filter((req) => req.met).length;
  const passwordMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (passwordStrength < 3) {
      toast.error("A senha não atende aos requisitos mínimos");
      return;
    }

    setIsLoading(true);

    try {
      const success = await useRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        toast.success("Conta criada com sucesso!");
        navigate("/");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
      console.log("Form submitted:", formData);
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Header */}
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              FreshMarket
            </h1>
            <p className="text-muted-foreground mt-2">Crie sua conta</p>
          </motion.div>

          {/* Register Form */}
          <motion.div variants={itemVariants}>
            <Card className="border-green-100 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-green-800">
                  Cadastrar-se
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="pl-9 border-green-200 focus:ring-green-500/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="pl-9 border-green-200 focus:ring-green-500/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="pl-9 pr-9 border-green-200 focus:ring-green-500/20"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>

                    {/* Password Strength */}
                    {formData.password.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Força da senha:
                          </span>
                          <Progress
                            value={(passwordStrength / 3) * 100}
                            className="h-1 flex-1"
                          />
                          <span className="text-xs font-medium">
                            {passwordStrength === 1 && (
                              <span className="text-red-500">Fraca</span>
                            )}
                            {passwordStrength === 2 && (
                              <span className="text-yellow-500">Média</span>
                            )}
                            {passwordStrength === 3 && (
                              <span className="text-green-500">Forte</span>
                            )}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {passwordRequirements.map((req, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2 text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {req.met ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500" />
                              )}
                              <span
                                className={
                                  req.met ? "text-green-600" : "text-red-600"
                                }
                              >
                                {req.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className={`pl-9 pr-9 border-green-200 focus:ring-green-500/20 ${
                          formData.confirmPassword.length > 0
                            ? passwordMatch
                              ? "border-green-300 focus:border-green-500"
                              : "border-red-300 focus:border-red-500"
                            : ""
                        }`}
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirmPassword.length > 0 && (
                      <motion.div
                        className="flex items-center gap-2 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {passwordMatch ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-green-600">
                              Senhas coincidem
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 text-red-500" />
                            <span className="text-red-600">
                              Senhas não coincidem
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={
                        isLoading || passwordStrength < 3 || !passwordMatch
                      }
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg disabled:opacity-50"
                      size="lg"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <UserIcon className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6">
                  <Separator className="my-4" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Já tem uma conta?{" "}
                      <motion.button
                        onClick={() => navigate("/login")}
                        className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
                        whileHover={{ x: 2 }}
                      >
                        Fazer login
                        <ArrowRight className="h-3 w-3" />
                      </motion.button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="text-center" variants={itemVariants}>
            <motion.button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              whileHover={{ x: -2 }}
            >
              ← Voltar para a loja
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
