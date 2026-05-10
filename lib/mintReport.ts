import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { create } from '@metaplex-foundation/mpl-core';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

export async function mintReportNFT(wallet: any, report: any) {
  const umi = createUmi('https://api.devnet.solana.com')
    .use(irysUploader())
    .use(walletAdapterIdentity(wallet));

  const metadata = {
    name: `AlphaPaper #${Date.now()}`,
    description: report.analysis?.summary || 'AI Whitepaper Analysis',
    image: 'https://alphapaper.xyz/logo.png',
    external_url: `https://alphapaper.xyz/report/${report.id}`,
    attributes: [
      { trait_type: 'Hype Score', value: report.analysis?.hype_score || 7.5 },
      { trait_type: 'Risk Score', value: report.analysis?.risk_score || 4.2 },
    ],
  };

  const uri = await umi.uploader.uploadJson(metadata);
  const asset = await create(umi, { name: metadata.name, uri }).sendAndConfirm(umi);
  return asset;
}