 Antes de empezar, necesito que me confirmes/respondas
  3 cosas más:

  A) El chat de IA — ¿cómo querés que entregue el brief?

- (1) Te llega por email (el más simple, recomendado  
  para empezar)
- (2) Se guarda en Supabase (base de datos, podés ver
  todos los briefs)
- (3) Dispara un webhook en n8n (más potente, podés
  automatizar el seguimiento)
Respuesta: Si lo crees más conveniente por el momento por email. Pero si pudieramos armar algo más eficiente y mejor con n8n seria estupendo.
  B) ¿Tenés API key de Anthropic (Claude) o preferís usar OpenAI?
  Claude es obviamente más coherente con la identidad de "agencia de IA", pero si ya tenés OpenAI va a funcionar igual.
   Respuesta: Tengo API key de Claude y de Gemini Pro. Si pudieramos usar Gemini sería ideal para liberar el consumo de tokens de Claude. Pero si hace la diferencia sustancial usemos Claude.

  C) Para los proyectos reales — ¿podés compartirme nombres, descripciones de 2-3 líneas, y el tipo de SaaS que son?
  No necesito los screenshots ahora, solo el texto para que el carousel tenga contenido real.
  
  Respuesta:
  1. **Sistema de Gestión para Gimnasios e Instalaciones de Fitness**
     - **Nombre:** CRM-Gimmaster
     - **Descripción:** Un sistema SaaS de alto rendimiento diseñado para la administración integral de gimnasios y centros de fitness. Simplifica las operaciones a través de cobros recurrentes y links de pago automatizados mediante Mercado Pago, y un control de accesos integrado con códigos QR. Además, ayuda a potenciar los cierres de ventas utilizando Inteligencia Artificial (OpenAI) para evaluar y calificar automáticamente a los clientes potenciales (Lead Scoring). Ofrece un panel de métricas financieras (MRR, KPIs diarios) y controla el acceso a la información sensible mediante roles (RBAC).
     - **Tipo:** Gestión deportiva y administrativa (B2B SaaS).

  2. **SaaS de Automatización de Marketing para Restaurantes**
     - **Nombre:** MenuFlow AI
     - **Descripción:** Una solución SaaS que ayuda a los restaurantes a automatizar sus campañas de marketing digital. Se integra con sistemas de punto de venta y redes sociales para generar automáticamente promociones personalizadas, gestionar reservas, enviar notificaciones a clientes y analizar el rendimiento de las campañas, todo desde un panel centralizado.
     - **Tipo:** Marketing automation y CRM para hostelería (B2B SaaS).

  3. **"SaaS de Traducción y Clonación de Voz en Tiempo Real**
     - **Nombre:** SynthVoice -
     - **Descripción:** Una plataforma SaaS de IA que permite la traducción, síntesis y clonación de voz en tiempo real con muy baja latencia. Orquesta comunicaciones WebRTC a través de LiveKit y gestiona un flujo completo de inferencia a través de modelos avanzados (Whisper para transcripción, Qwen para traducción, CosyVoice para texto-a-voz y RVC para clonación/refinamiento de voz), habilitando interacciones de voz conversacionales y multilingües con capacidad de interrupción (barge-in).
     - **Tipo:** Inteligencia Artificial y VoiceTech (B2B/B2C SaaS)."

  4. **Plataforma S2ST de Traducción de Voz en Tiempo Real -**
     - **Nombre:** SynthVoice -
     - **Descripción:** Una plataforma y orquestador de muy baja latencia (S2ST pipeline) diseñada para la traducción de voz a voz en tiempo real. Utiliza WebRTC (LiveKit) en el frontend para el manejo fluido del audio en vivo y procesa las señales a través de un backend basado en modelos avanzados de Inteligencia Artificial (Whisper Streaming para transcripción, Qwen para traducción, CosyVoice para generación Text-to-Speech y RVC para refinamiento de voz). El objetivo es romper la barrera del idioma permitiendo conversaciones instantáneas y con mínima latencia de procesamiento. -
     - **Tipo:** Inteligencia Artificial y Comunicaciones (Speech-to-Speech Translation / Web App).
