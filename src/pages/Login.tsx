import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, Leaf, ArrowRight, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useLogin } from "../services/auth";

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

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await useLogin({
        email: formData.email,
        password: formData.password,
      });

      console.log(result);

      if (result) {
        toast.success(`Seja bem-vindo ${result.user.name} !`);
        navigate("/");
      } else {
        toast.error("");
      }
    } catch (error) {
      toast.error("");
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
      {/* Background Elements */}

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
            <p className="mt-2 text-white">Entre na sua conta</p>
          </motion.div>

          {/* Login Form */}
          <motion.div variants={itemVariants}>
            <Card className="border-green-100 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-green-800">
                  Fazer Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-green-600"
                    >
                      Esqueceu a senha?
                    </Button>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
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
                        <User className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6">
                  <Separator className="my-4" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Não tem uma conta?{" "}
                      <motion.button
                        onClick={() => navigate("/register")}
                        className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
                        whileHover={{ x: 2 }}
                      >
                        Cadastre-se
                        <ArrowRight className="h-3 w-3" />
                      </motion.button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Info */}
          <motion.div
            className="text-center p-4 bg-green-50 rounded-lg border border-green-200"
            variants={itemVariants}
          >
            <p className="text-sm text-green-700 mb-2">
              <strong>Demo:</strong> Use qualquer email e senha para testar
            </p>
            <p className="text-xs text-green-600">
              Exemplo: demo@freshmarket.com / 123456
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="text-center" variants={itemVariants}>
            <motion.button
              onClick={() => navigate("/")}
              className="text-sm text-white cursor-pointer inline-flex items-center gap-1"
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
