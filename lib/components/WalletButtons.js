import walletConfigs from "../configs/wallets";

const WalletButtons = ({
  onSelectWallet = () => {},
  className = ``,
  containerClassName = ``,
  styles = {},
}) => {
  return (
    <div className={`flex flex-col items-center ${containerClassName}`}>
      {walletConfigs.map(({ title, connectorId, uid, background }) => (
        <button
          key={uid}
          onClick={() => onSelectWallet(connectorId, uid).catch(() => null)}
          style={{ background, ...styles[uid] }}
          className={`font-medium px-4 py-2 my-2 border rounded-md text-white ${className}`}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default WalletButtons;
