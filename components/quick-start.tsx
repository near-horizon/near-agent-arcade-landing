"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import PixelText from "./ui/pixel-text"
import ArcadeDivider from "./ui/arcade-divider"

export default function QuickStart() {
  const [activeTab, setActiveTab] = useState("installation")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const tabs = [
    { id: "installation", label: "Installation" },
    { id: "training", label: "Training" },
    { id: "evaluation", label: "Evaluation" },
    { id: "competition", label: "Competition" },
  ]

  const codeBlocks = {
    installation: [
      {
        code: "# Clone the repository\ngit clone https://github.com/jbarnes850/agent-arcade.git\ncd agent-arcade\n\n# Step 1: Create virtual environment\nchmod +x ./install.sh\n./install.sh\n\n# Step 2: Activate virtual environment\nsource drl-env/bin/activate\n\n# Step 3: Install dependencies\nchmod +x ./install_in_venv.sh\n./install_in_venv.sh",
        output:
          "✓ Virtual environment created\n✓ Dependencies installed\n✓ Atari ROMs installed\n✓ Installation verified",
      },
    ],
    training: [
      {
        code: "# Train Pong agent with visualization\nagent-arcade train pong --render\n\n# Train Space Invaders with custom config\nagent-arcade train space-invaders --config models/space_invaders/config.yaml\n\n# Monitor training progress\ntensorboard --logdir ./tensorboard/DQN_[game]_[timestamp]",
        output:
          "Training agent...\nStep: 10000, Mean Reward: -19.5\nStep: 20000, Mean Reward: -17.2\n...\nStep: 1000000, Mean Reward: 15.8\nModel saved to ./models/pong/[timestamp]/final_model.zip",
      },
    ],
    evaluation: [
      {
        code: "# Login to NEAR wallet first\nagent-arcade wallet-cmd login\n\n# Evaluate trained model\nagent-arcade evaluate pong models/pong/[timestamp]/final_model.zip --episodes 50\n\n# Evaluate with video recording\nagent-arcade evaluate space-invaders models/space_invaders/final_model.zip --render --record",
        output:
          "Evaluating agent...\nEpisode 1/50: Score 17\nEpisode 2/50: Score 19\n...\nEpisode 50/50: Score 21\nMean Score: 19.4\nVerification token generated: ~/.agent-arcade/verification_tokens/pong_[timestamp].token",
      },
    ],
    competition: [
      {
        code: "# Submit verified score (requires evaluation token)\nagent-arcade stake submit pong 15\n\n# View leaderboard\nagent-arcade leaderboard top pong\n\n# Check rewards and balance\nagent-arcade wallet-cmd status",
        output:
          "Submitting score...\nScore verified ✓\nTransaction: https://explorer.testnet.near.org/transactions/...\nReward: 0.5 NEAR\nNew balance: 10.5 NEAR",
      },
    ],
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section className="relative py-20 px-4 bg-gray-950" id="quick-start">
      <ArcadeDivider position="top" />

      <div className="max-w-6xl mx-auto">
        <PixelText text="QUICK START" className="text-3xl sm:text-4xl md:text-5xl text-center mb-16" />

        <div className="bg-gray-900 rounded-lg border-2 border-purple-900 overflow-hidden">
          {/* Terminal header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-mono text-gray-300">agent-arcade ~ terminal</div>
          </div>

          {/* Prerequisites notice */}
          <div className="p-4 bg-purple-500/10 border-b border-purple-500/20">
            <h3 className="text-sm font-medium text-purple-400 mb-2">Prerequisites</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Python 3.8 - 3.11 (3.12 has known issues, 3.13 not supported)</li>
              <li>• Linux, macOS, or WSL2 on Windows</li>
              <li>• 2GB free space, 4GB RAM recommended</li>
              <li>• Node.js & NEAR account (for staking)</li>
            </ul>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-cyan-400 border-t-2 border-cyan-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm">
            {Object.entries(codeBlocks).map(([tabId, blocks]) => (
              <div key={tabId} className={activeTab === tabId ? "block" : "hidden"}>
                {blocks.map((block, index) => (
                  <div key={index} className="mb-6">
                    {/* Command */}
                    <div className="flex items-start group">
                      <div className="mr-2 text-green-400">$</div>
                      <div className="flex-1 bg-gray-800 p-2 rounded-md overflow-x-auto">
                        <pre className="text-gray-200">{block.code}</pre>
                      </div>
                      <button
                        onClick={() => copyToClipboard(block.code, index)}
                        className="ml-2 p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Copy to clipboard"
                      >
                        {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Output */}
                    {block.output && (
                      <div className="mt-2 bg-black bg-opacity-50 p-2 rounded-md overflow-x-auto">
                        <pre className="text-gray-300 whitespace-pre-wrap">{block.output}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex items-center mt-4">
              <div className="text-green-400 mr-2">$</div>
              <div className="h-5 w-24 bg-gray-800 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-2 bg-gray-300 animate-cursor"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            For detailed installation instructions and troubleshooting, check out the{" "}
            <a
              href="https://github.com/jbarnes850/agent-arcade/blob/main/docs/installation.md"
              className="text-cyan-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              installation guide
            </a>
            .
          </p>
        </div>
      </div>

      <ArcadeDivider position="bottom" />
    </section>
  )
}

