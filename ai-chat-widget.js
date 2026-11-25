/**
 * ============================================================================
 * NINH BINH VALLEY HOMESTAY - AI VIRTUAL CONCIERGE WIDGET
 * ============================================================================
 * Dedicated 24/7 Smart Assistant for Guests & Travelers
 * Helps with: Room Rates, Transport from Hanoi, Itineraries, Campfire BBQ & Tours
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  if (window.NinhBinhValleyChatWidget) return;

  const CONFIG = {
    title: 'Ninh Binh Valley Concierge',
    subtitle: 'Trợ lý du lịch & Đặt phòng 24/7',
    primaryColor: '#183B2D',
    accentColor: '#D4A373',
    welcomeMessage: 'Xin chào quý khách! 🌿 Chào mừng quý khách đến với **Ninh Binh Valley Homestay** - chốn nghỉ dưỡng thanh bình giữa thung lũng đá vôi và đầm sen xanh mát. Em có thể hỗ trợ quý khách về giá phòng, cách di chuyển từ Hà Nội, hoặc gợi ý lịch trình khám phá Ninh Bình nhé!',
    quickReplies: [
      '🏡 Xem giá phòng & ưu đãi',
      '🚐 Cách đi từ Hà Nội về homestay',
      '🔥 Tiệc BBQ & Đốt lửa trại',
      '🛶 Chèo thuyền & Xe đạp miễn phí',
      '🗺️ Gợi ý lịch trình 2 ngày 1 đêm'
    ],
    knowledgeBase: {
      'gia_phong': {
        keywords: ['giá phòng', 'bảng giá', 'room rate', 'price', 'chi phí', 'đặt phòng', 'bao nhiêu tiền', 'hạng phòng'],
        response: `🏡 **Bảng Giá & Các Hạng Phòng Nghỉ Tại Ninh Binh Valley Homestay:**\n\n1. **Bungalow Ven Hồ (Lakeview Bamboo Bungalow)**\n- Giường đôi King size, ban công sát mặt nước ngắm thung lũng đá vôi, võng nằm riêng\n- Giá: Từ **650.000đ - 750.000đ/đêm** (Đã gồm ăn sáng)\n\n2. **Bungalow Gia Đình (Family Valley Bungalow)**\n- 2 Giường Queen lớn, sức chứa 4 khách, không gian ấm cúng bằng gỗ và tre nứa\n- Giá: Từ **950.000đ - 1.150.000đ/đêm**\n\n3. **Phòng Nhà Sàn Sinh Thái (Superior Stilt Room)**\n- Ban công hướng vườn hoa cánh bướm và núi đá, mái ngói cổ truyền\n- Giá: Từ **550.000đ/đêm**\n\n🎁 **Ưu đãi bao gồm:** Bữa sáng địa phương, xe đạp miễn phí không giới hạn, sử dụng bể bơi vô cực view thung lũng, trà sen chào mừng!`
      },
      'di_chuyen': {
        keywords: ['di chuyển', 'hà nội', 'xe khách', 'limousine', 'đưa đón', 'đến như thế nào', 'hanoi', 'transport', 'đường đi'],
        response: `🚐 **Hướng Dẫn Di Chuyển Đến Ninh Binh Valley Homestay:**\n\n- **Địa chỉ:** Thung Nắng, xã Ninh Hải, huyện Hoa Lư, tỉnh Ninh Bình (cách bến thuyền Tam Cốc chỉ 2km).\n- **Xe Limousine từ Hà Nội:** Xe đón tận nơi tại phố cổ Hà Nội / sân bay Nội Bài, trả khách tận cổng homestay (thời gian đi khoảng 1.5 - 2 tiếng). Giá vé dao động 150.000đ - 220.000đ/vé.\n- **Tàu hỏa:** Tuyến Hà Nội - Ninh Bình (khoảng 2 tiếng). Đến ga Ninh Bình, quý khách đi taxi hoặc homestay hỗ trợ đặt xe đón (khoảng 15 phút, ~80.000đ - 100.000đ).\n- **Homestay có bãi đỗ xe ô tô rộng rãi và an toàn miễn phí** cho quý khách tự lái xe.`
      },
      'bbq_lua_trai': {
        keywords: ['bbq', 'lửa trại', 'ăn tối', 'ăn uống', 'nướng', 'campfire', 'dinner', 'đốt lửa'],
        response: `🔥 **Trải Nghiệm Lửa Trại & BBQ Đêm Bên Bờ Hồ:**\n\n- Mỗi tối, homestay đều tổ chức **đốt lửa trại bên bờ hồ**, nơi quý khách có thể nướng bắp ngô, khoai lang nướng thơm lừng, cùng trò chuyện và giao lưu cùng bạn bè quốc tế.\n- **Bữa tối gia đình & Tiệc BBQ:** Phục vụ các món đặc sản tươi ngon: Dê núi nướng tảng, gà đồi nướng than hoa, cá hồ om dưa, cơm cháy giòn rụm và các món chay rau vườn theo yêu cầu.\n- Quý khách chỉ cần báo trước với lễ tân lúc check-in để bếp chuẩn bị nguyên liệu tươi ngon nhất trong ngày nhé!`
      },
      'cheo_thuyen_xe_dap': {
        keywords: ['chèo thuyền', 'xe đạp', 'bơi', 'hồ bơi', 'boat', 'bicycle', 'pool', 'kayak', 'miễn phí'],
        response: `🛶 **Tiện Ích & Hoạt Động Miễn Phí Tại Homestay:**\n\n- 🚲 **Xe đạp miễn phí:** Luôn sẵn sàng cho quý khách đạp xe dạo quanh thung lũng, ngắm đàn trâu gặm cỏ, cánh đồng sen và thăm thú Chùa Bích Động gần kề.\n- 🛶 **Thuyền nan mộc:** Có sẵn tại bến hồ của homestay để quý khách tự do chèo ngắm cảnh đầm sen và vách đá sừng sững.\n- 🏊 **Hồ bơi vô cực sinh thái:** Nằm ngay trung tâm khuôn viên, view trực diện dãy núi đá vôi hùng vĩ, cực kỳ lý tưởng để tắm mát và check-in sống ảo vào mỗi buổi chiều hoàng hôn!`
      },
      'lich_trinh': {
        keywords: ['lịch trình', 'tour', 'chơi gì', 'tham quan', 'itinerary', '2 ngày', 'gợi ý', 'bích động', 'tràng an', 'bái đính', 'hoa lư'],
        response: `🗺️ **Gợi Ý Lịch Trình Khám Phá Ninh Bình 2N1Đ Tuyệt Đẹp:**\n\n📌 **Ngày 1:**\n- Sáng: Di chuyển đến Homestay, check-in, thưởng thức trà sen và dạo quanh thung lũng.\n- Trưa: Thưởng thức bữa trưa cơm quê tại homestay.\n- Chiều: Lấy xe đạp miễn phí đi thăm **Chùa Bích Động** (2km) & leo đỉnh **Hang Múa** ngắm hoàng hôn Tam Cốc.\n- Tối: Thưởng thức tiệc BBQ dê núi nướng và đốt lửa trại bên hồ cùng gia đình homestay.\n\n📌 **Ngày 2:**\n- Sáng: Tắm hồ bơi ngắm sương sớm, ăn sáng đặc sản. Chèo thuyền nan quanh hồ.\n- 09h00: Đi tour thuyền **Khu di sản Tràng An** hoặc thăm **Cố đô Hoa Lư** & **Chùa Bái Đính**.\n- Trưa: Trả phòng, mua quà đặc sản cơm cháy và lên xe về lại Hà Nội.`
      }
    }
  };

  class ValleyChatWidget {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.initDOM();
      this.bindEvents();
    }

    initDOM() {
      // Container chính
      this.wrapper = document.createElement('div');
      this.wrapper.id = 'valley-chat-widget-root';
      this.wrapper.className = 'fixed bottom-6 right-6 z-50 font-sans';

      this.wrapper.innerHTML = `
        <!-- Nút Tròn Mở Widget -->
        <button id="valley-chat-trigger" class="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#183B2D] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#D4A373]/40 focus:outline-none" aria-label="Mở Trợ lý Du Lịch Ninh Binh Valley">
          <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white"></span>
          </span>
          <svg id="chat-icon-msg" class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <svg id="chat-icon-close" class="w-6 h-6 hidden transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Khung Cửa Sổ Chat -->
        <div id="valley-chat-window" class="hidden absolute bottom-16 right-0 w-[360px] sm:w-[390px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex-col transition-all duration-300 transform origin-bottom-right scale-95 opacity-0">
          
          <!-- Header Cửa Sổ -->
          <div class="bg-gradient-to-r from-[#183B2D] to-[#2D6A52] px-4 py-3.5 text-white flex items-center justify-between border-b border-emerald-900/40">
            <div class="flex items-center gap-3">
              <div class="relative w-10 h-10 rounded-full bg-white/10 border border-[#D4A373]/60 flex items-center justify-center text-amber-300 font-bold overflow-hidden shadow-inner">
                <span class="text-sm">NBV</span>
              </div>
              <div>
                <h3 class="font-bold text-sm tracking-wide flex items-center gap-1.5 text-white">
                  ${CONFIG.title}
                  <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                </h3>
                <p class="text-[11px] text-emerald-200">${CONFIG.subtitle}</p>
              </div>
            </div>
            <button id="valley-chat-close-btn" class="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors" aria-label="Đóng chat">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Body Tin Nhắn -->
          <div id="valley-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] text-sm">
            <!-- Tin nhắn sẽ được append vào đây -->
          </div>

          <!-- Gợi ý câu hỏi nhanh (Quick Replies) -->
          <div id="valley-chat-quick-replies" class="px-3 py-2 bg-white border-t border-stone-200/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            ${CONFIG.quickReplies.map(qr => `
              <button class="quick-reply-btn whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#183B2D] hover:text-white text-stone-700 border border-stone-200 transition-colors duration-200">
                ${qr}
              </button>
            `).join('')}
          </div>

          <!-- Footer Nhập Tin Nhắn -->
          <div class="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input type="text" id="valley-chat-input" placeholder="Hỏi về phòng, xe cộ, tiệc BBQ..." class="flex-1 text-xs sm:text-sm bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#183B2D] focus:bg-white text-stone-800 transition-colors">
            <button id="valley-chat-send" class="p-2.5 rounded-xl bg-[#183B2D] hover:bg-[#2D6A52] text-white transition-colors duration-200 shadow-sm" aria-label="Gửi câu hỏi">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>

        </div>
      `;

      document.body.appendChild(this.wrapper);

      this.triggerBtn = document.getElementById('valley-chat-trigger');
      this.chatWindow = document.getElementById('valley-chat-window');
      this.closeBtn = document.getElementById('valley-chat-close-btn');
      this.messagesContainer = document.getElementById('valley-chat-messages');
      this.inputField = document.getElementById('valley-chat-input');
      this.sendBtn = document.getElementById('valley-chat-send');
      this.iconMsg = document.getElementById('chat-icon-msg');
      this.iconClose = document.getElementById('chat-icon-close');

      // Khởi tạo lời chào mặc định
      this.appendBotMessage(CONFIG.welcomeMessage);
    }

    bindEvents() {
      this.triggerBtn.addEventListener('click', () => this.toggleChat());
      this.closeBtn.addEventListener('click', () => this.closeChat());

      this.sendBtn.addEventListener('click', () => this.handleSend());
      this.inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });

      // Quick replies
      document.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const text = e.target.innerText.replace(/^[^\s]+\s/, ''); // Xóa emoji đầu
          this.inputField.value = text;
          this.handleSend();
        });
      });
    }

    toggleChat() {
      if (this.isOpen) {
        this.closeChat();
      } else {
        this.openChat();
      }
    }

    openChat() {
      this.isOpen = true;
      this.chatWindow.classList.remove('hidden');
      setTimeout(() => {
        this.chatWindow.classList.remove('scale-95', 'opacity-0');
        this.chatWindow.classList.add('scale-100', 'opacity-100', 'flex');
      }, 10);
      this.iconMsg.classList.add('hidden');
      this.iconClose.classList.remove('hidden');
      this.inputField.focus();
    }

    closeChat() {
      this.isOpen = false;
      this.chatWindow.classList.remove('scale-100', 'opacity-100');
      this.chatWindow.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        this.chatWindow.classList.add('hidden');
        this.chatWindow.classList.remove('flex');
      }, 300);
      this.iconMsg.classList.remove('hidden');
      this.iconClose.classList.add('hidden');
    }

    handleSend() {
      const query = this.inputField.value.trim();
      if (!query) return;

      this.appendUserMessage(query);
      this.inputField.value = '';

      // Hiệu ứng "Đang gõ..."
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'flex items-center gap-1.5 text-stone-400 text-xs py-1';
      typingIndicator.innerHTML = `
        <span class="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
        <span class="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
        <span class="ml-1 text-[11px] text-stone-500 font-medium">Valley Homestay đang soạn trả lời...</span>
      `;
      this.messagesContainer.appendChild(typingIndicator);
      this.scrollToBottom();

      setTimeout(() => {
        typingIndicator.remove();
        const reply = this.findAnswer(query);
        this.appendBotMessage(reply);
      }, 650);
    }

    findAnswer(query) {
      const q = query.toLowerCase();

      if (q.includes('giá') || q.includes('phòng') || q.includes('rate') || q.includes('price') || q.includes('bao nhiêu')) {
        return CONFIG.knowledgeBase.gia_phong.response;
      }
      if (q.includes('hà nội') || q.includes('xe') || q.includes('đường đi') || q.includes('di chuyển') || q.includes('transport') || q.includes('limousine')) {
        return CONFIG.knowledgeBase.di_chuyen.response;
      }
      if (q.includes('bbq') || q.includes('lửa trại') || q.includes('nướng') || q.includes('ăn tối') || q.includes('campfire') || q.includes('đốt lửa')) {
        return CONFIG.knowledgeBase.bbq_lua_trai.response;
      }
      if (q.includes('thuyền') || q.includes('xe đạp') || q.includes('bơi') || q.includes('hồ bơi') || q.includes('boat') || q.includes('kayak') || q.includes('đạp xe')) {
        return CONFIG.knowledgeBase.cheo_thuyen_xe_dap.response;
      }
      if (q.includes('lịch trình') || q.includes('tour') || q.includes('chơi gì') || q.includes('bích động') || q.includes('tràng an') || q.includes('bái đính') || q.includes('hoa lư')) {
        return CONFIG.knowledgeBase.lich_trinh.response;
      }

      // Trả lời mặc định hữu ích
      return `Dạ em đã ghi nhận thông tin của quý khách! 🌿 Quý khách muốn đặt phòng ngày nào, đi mấy người hoặc cần đón xe từ Hà Nội cứ nhắn cho em nhé. Hoặc quý khách có thể gọi trực tiếp Hotline/Zalo: **0975 305 780** để được anh chị chủ nhà tư vấn giữ phòng tốt nhất nhé ạ!`;
    }

    appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'flex justify-end';
      msgDiv.innerHTML = `
        <div class="bg-[#183B2D] text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[85%] shadow-sm text-xs sm:text-[13px] leading-relaxed">
          ${this.escapeHTML(text)}
        </div>
      `;
      this.messagesContainer.appendChild(msgDiv);
      this.scrollToBottom();
    }

    appendBotMessage(markdown) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'flex items-start gap-2';
      msgDiv.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#183B2D] text-amber-300 flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-xs">
          NBV
        </div>
        <div class="bg-white border border-stone-200/80 text-stone-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 max-w-[88%] shadow-sm text-xs sm:text-[13px] leading-relaxed space-y-1.5">
          ${this.formatMarkdown(markdown)}
        </div>
      `;
      this.messagesContainer.appendChild(msgDiv);
      this.scrollToBottom();
    }

    formatMarkdown(text) {
      let formatted = text
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-900 font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      return formatted;
    }

    escapeHTML(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  // Tự động khởi chạy widget khi load DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.NinhBinhValleyChatWidget = new ValleyChatWidget();
    });
  } else {
    window.NinhBinhValleyChatWidget = new ValleyChatWidget();
  }

})(window, document);
