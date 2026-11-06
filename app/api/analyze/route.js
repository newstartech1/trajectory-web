"use client";

import { useState } from "react";

const example = {
  problem: "Solve 2x + 5 = 17",
  answer: "x = 5",
  reasoning: "Subtract 5: 2x = 12. Divide by 2: x = 5."
};

export default function Home() {
  const [problem, setProblem] = useState("");
  const [answer, setAnswer] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("");
  const [verified, setVerified] = useState(false);

  function loadExample() {
    setProblem(example.problem);
    setAnswer(example.answer);
    setReasoning(example.reasoning);
    setAnalysis("");
    setError("");
    setProvider("");
    setVerified(false);
  }

  async function analyze() {
    if (!problem.trim() || !answer.trim()) {
      setError("Please enter a problem and your answer.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");
    setProvider("");
    setVerified(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problem,
          answer,
          reasoning
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "AI analysis failed."
        );
      }

      setAnalysis(data.analysis);
      setProvider(data.provider || "AI");
      setVerified(data.independentlyVerified === true);
    } catch (err) {
      setError(
        err.message || "Unable to connect to AI."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: 850,
      margin: "auto",
      padding: "35px 20px",
      fontFamily: "Arial, sans-serif",
      color: "#203629"
    }}>
      <header>
        <h1>Trajectory</h1>
        <p>Reasoning matters more than the final answer.</p>
        <h2>AI Mathematics Diagnostics</h2>
        <p>
          Understand mistakes, reasoning paths,
          mathematical correctness, and better methods.
        </p>
      </header>

      <section style={{
        display: "grid",
        gap: 18,
        marginTop: 30
      }}>
        <label>
          <strong>Mathematical problem</strong>
          <textarea
            value={problem}
            onChange={e => setProblem(e.target.value)}
            maxLength={4000}
            rows={3}
            style={fieldStyle}
            placeholder="Enter a mathematical problem"
          />
        </label>

        <label>
          <strong>Your answer</strong>
          <input
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            maxLength={1000}
            style={fieldStyle}
            placeholder="Enter your answer"
          />
        </label>

        <label>
          <strong>Your reasoning (optional)</strong>
          <textarea
            value={reasoning}
            onChange={e => setReasoning(e.target.value)}
            maxLength={8000}
            rows={5}
            style={fieldStyle}
            placeholder="Explain your steps"
          />
        </label>

        <button
          onClick={analyze}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>

        <button
          onClick={loadExample}
          disabled={loading}
          style={{
            ...buttonStyle,
            background: "#e3ebe1",
            color: "#203629"
          }}
        >
          Load common mistake
        </button>
      </section>

      {error && (
        <section role="alert" style={{
          ...resultStyle,
          border: "1px solid #c9a765"
        }}>
          <h3>Analysis unavailable</h3>
          <p>{error}</p>
        </section>
      )}

      {analysis && (
        <section style={resultStyle}>
          <h2>Trajectory AI Analysis</h2>
          <p>
            <strong>Provider:</strong> {provider}
          </p>
          <p>
            <strong>Independent verification:</strong>{" "}
            {verified ? "Completed" : "Not performed"}
          </p>

          <div style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            lineHeight: 1.7,
            marginTop: 20
          }}>
            {analysis}
          </div>

          <p style={{
            fontSize: 13,
            marginTop: 25,
            opacity: 0.8
          }}>
            AI-generated educational feedback may contain
            errors. Severity estimates are preliminary.
          </p>
        </section>
      )}

      <footer style={{
        marginTop: 50,
        textAlign: "center",
        fontSize: 13,
        opacity: 0.7
      }}>
        Trajectory · New Star Tech · AI-powered prototype
      </footer>
    </main>
  );
}

const fieldStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  marginTop: 9,
  borderRadius: 12,
  border: "1px solid #cbd8ca",
  fontSize: 16,
  fontFamily: "inherit",
  background: "#ffffff",
  color: "#203629"
};

const buttonStyle = {
  padding: 16,
  border: "none",
  borderRadius: 12,
  background: "#508557",
  color: "white",
  fontSize: 17,
  fontWeight: "bold",
  cursor: "pointer"
};

const resultStyle = {
  marginTop: 30,
  padding: 25,
  background: "#f2f8f1",
  borderRadius: 16,
  border: "1px solid #d3e3d0"
};