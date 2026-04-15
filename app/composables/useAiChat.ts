// composables/useAiChat.ts
export function useAiChat() {
  const messages = ref<{ role: "user" | "ai"; text: string }[]>([]);
  const pending = ref(false);

  async function send(message: string) {
    messages.value.push({ role: "user", text: message });
    pending.value = true;

    try {
      const { answer } = await $fetch("/api/ai/chat", {
        method: "POST",
        body: { message, history: messages.value },
      });
      if (answer && answer.length > 0) {
        messages.value.push({ role: "ai", text: answer });
      } else {
        messages.value.push({
          role: "ai",
          text: "Ответ не получен. Попробуйте еще раз.",
        });
      }
      // messages.value.push({ role: "ai", text: answer || "" });
    } finally {
      pending.value = false;
    }
  }

  return { messages, pending, send };
}
