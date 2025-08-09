document.getElementById("askBtn").addEventListener("click", async () => {
  const apiKey = document.getElementById("apiKey").value.trim();
  const model = document.getElementById("model").value;
  const question = document.getElementById("userQuestion").value.trim();
  const answerDiv = document.getElementById("answer");
  const errorDiv = document.getElementById("error");
  const loadingDiv = document.getElementById("loading");
  const askBtn = document.getElementById("askBtn");

  // Reset UI
  errorDiv.classList.add("hidden");
  answerDiv.classList.add("hidden");
  loadingDiv.classList.add("hidden");

  // Validações
  if (!apiKey) {
    errorDiv.textContent = "Por favor, insira sua API Key.";
    errorDiv.classList.remove("hidden");
    return;
  }
  if (!question) {
    errorDiv.textContent = "Por favor, digite uma pergunta.";
    errorDiv.classList.remove("hidden");
    return;
  }

  // Loading state
  loadingDiv.classList.remove("hidden");
  askBtn.disabled = true;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: question }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Sem resposta disponível.";
    answerDiv.textContent = answer;
    answerDiv.classList.remove("hidden");

  } catch (err) {
    errorDiv.textContent = "Ocorreu um erro: " + err.message;
    errorDiv.classList.remove("hidden");
  } finally {
    loadingDiv.classList.add("hidden");
    askBtn.disabled = false;
  }
});