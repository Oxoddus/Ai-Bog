/**
 * Telegram Bot API Integration Service Layer for UbayHub Blora
 * Sends real-time broadcast and automated service status updates to Telegram channels/users.
 */

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface ServiceOrderTelegramPayload {
  customerName: string;
  customerPhone: string;
  invoiceCode: string;
  deviceModel: string;
  deviceType: string;
  status: string;
  estimatedCost?: number;
  completionDate?: string;
}

/**
 * Format service order status update into a clean Telegram Markdown message
 */
export function formatTelegramServiceMessage(payload: ServiceOrderTelegramPayload): string {
  const statusEmoji: Record<string, string> = {
    'Diterima': '📥',
    'Pengecekan/Diagnosa': '🔍',
    'Menunggu Sparepart': '⏳',
    'Dalam Pengerjaan': '🛠️',
    'Testing & QC': '🧪',
    'Selesai & Siap Ambil': '✅',
    'Sudah Diambil': '📦',
    'Dibatalkan': '❌'
  };

  const emoji = statusEmoji[payload.status] || '📢';

  return (
    `🤖 *AUTOMATED BOT TELEGRAM UBAYHUB BLORA*\n` +
    `========================================\n\n` +
    `📌 *KODE RESI:* \`${payload.invoiceCode}\` \n` +
    `👤 *PELANGGAN:* ${payload.customerName} (\`${payload.customerPhone}\`)\n` +
    `📺 *PERANGKAT:* ${payload.deviceModel} (${payload.deviceType})\n` +
    `${emoji} *STATUS TERKINI:* *${payload.status}*\n` +
    (payload.estimatedCost ? `💰 *ESTIMASI BIAYA:* Rp ${payload.estimatedCost.toLocaleString('id-ID')}\n` : '') +
    (payload.completionDate ? `📅 *ESTIMASI SELESAI:* ${payload.completionDate}\n` : '') +
    `\n🔗 *Lacak Status Real-Time:* https://ubayhub.id/service\n` +
    `\n_Pusat Service & Toko Elektronik Terlengkap di Blora_`
  );
}

/**
 * Sends a message via Telegram Bot API endpoint
 */
export async function sendTelegramNotification(
  config: TelegramConfig,
  text: string,
  parseMode: 'Markdown' | 'HTML' = 'Markdown'
): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!config.botToken || !config.chatId) {
    return {
      success: false,
      error: 'Telegram Bot Token atau Chat ID belum dikonfigurasi.'
    };
  }

  // If token is simulated/placeholder, return graceful simulation
  if (config.botToken.includes('UBAYHUB_BLORA_TOKEN') || config.botToken.startsWith('7123456789')) {
    console.log('[Telegram Bot Service Simulated Dispatch]:', {
      chatId: config.chatId,
      text
    });
    return {
      success: true,
      data: { simulated: true, chatId: config.chatId, message: 'Simulated dispatch successful' }
    };
  }

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text,
        parse_mode: parseMode,
        disable_web_page_preview: false
      })
    });

    const data = await response.json();

    if (!data.ok) {
      return {
        success: false,
        error: data.description || 'Gagal mengirim pesan via Telegram Bot API'
      };
    }

    return {
      success: true,
      data: data.result
    };
  } catch (err: any) {
    console.error('Error sending Telegram notification:', err);
    return {
      success: false,
      error: err.message || 'Terjadi kesalahan koneksi ke Telegram Bot API'
    };
  }
}
