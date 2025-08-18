import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">ShopHub</h3>
            <p className="text-sm text-muted-foreground">
              Sua loja online de confiança com os melhores produtos e preços do
              mercado.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-medium">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ofertas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h4 className="font-medium">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Central de ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de devolução
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos de uso
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Receba ofertas exclusivas e novidades em primeira mão.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Seu e-mail" className="bg-background" />
              <Button>Inscrever</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Trust badges */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">Compra 100% Segura</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Entrega Rápida</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Pagamento Seguro</span>
            </div>
          </div>

          <Separator />

          {/* Bottom footer */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ShopHub. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>contato@shophub.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
