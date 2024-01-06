import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import Image from "next/image";

const bannerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "100%",
  border: "4px solid #000411"
};

export default function ProfileCover({ banner, image } : { banner: string, image: string }) {
  return (
    <ConfigProvider theme={theme}>
      <div className="w-full relative">
        <div className="w-full h-40 lg:h-56">
          <Image
            src={banner}
            alt="Banner"
            style={bannerStyle}
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="absolute top-[5rem] left-[1rem] w-28 h-28 lg:w-40 lg:h-40 lg:top-[8rem] lg:left-[2rem]">
          <Image
            src={image}
            alt="Profile"
            style={imageStyle}
            width={500}
            height={250}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
