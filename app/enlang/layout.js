import "../Lang/css/listword.css"
import "../Lang/css/listwordRes.css"
import "../Lang/css/listswitchselection.css"
import "../Lang/css/navbottom.css"
import "../Lang/css/main.css"
import SettingProvider from "../Lang/Context/SettingContext"

export const metadata = {
  title: "Mi 5000 - Tổng Hợp 5000 Từ Vựng Tiếng Anh",
  description: "Khám phá Mi 5000 từ Miwabox.live, công cụ tổng hợp từ vựng tiếng Anh từ A1 đến C1. Với danh sách từ vựng Oxford được sắp xếp theo từng trình độ, Mi 5000 giúp bạn nắm bắt từ vựng nhanh chóng và dễ dàng. Bắt đầu với Mi 5000 để trải nghiệm cách tiếp cận từ vựng đơn giản và hiệu quả!",
  icons: {
    icon: '/miwabox_icon.svg',
  },
};

export default function EnLangLayout({ children }) {
  return (
    <SettingProvider>
      <div>{children}</div>
    </SettingProvider>
  );
}