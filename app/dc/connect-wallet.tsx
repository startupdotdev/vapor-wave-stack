import { useEffect } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
const { useAccounts, useError, useIsActivating, useIsActive } = hooks;

export default function ConnectWallet() {
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  function truncateAccount(accounts: string[]): string {
    return accounts
      .map((account) => `${account.slice(0, 3)}...${account.slice(-4)}`)
      .join(",");
  }

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <div className="box">
      {isActive && accounts && (
        <div className="flex text-sm text-gray-400">
          <div className=" py-2 px-4">
            Connected as {truncateAccount(accounts)}
          </div>
        </div>
      )}
      {typeof window !== "undefined" && !window.ethereum && (
        <a
          className="border border-brand-green text-brand-green py-4 px-4 rounded-md text-sm"
          target="_blank"
          href="https://metamask.io/"
        >
          Install MetaMask to get started
        </a>
      )}
      {typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined" &&
        !isActive && (
          <div className="text-sm">
            <button
              data-testid="connect-wallet"
              style={{
                background: "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
              }}
              className="bg-brand-green text-gray-900 py-4 px-4 rounded-md text-sm"
              onClick={isActivating ? undefined : () => metaMask.activate()}
              disabled={isActivating}
            >
              Connect Wallet
            </button>
          </div>
        )}
      {error?.message && (
        <div className="text-xs text-gray-500">{error.message}</div>
      )}
    </div>
  );
}
