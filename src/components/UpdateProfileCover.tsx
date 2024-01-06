import theme from "@/theme/themeConfig";
import { CloudUploadOutlined } from "@ant-design/icons";
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

export default function UpdateProfileCover({ banner, image } : { banner: string, image: string }) {
  return (
    <ConfigProvider theme={theme}>
      <div className="w-full relative">
        <div className="w-full h-40 lg:h-56 relative">
          <div className="flex justify-center items-center absolute w-full h-full bg-black rounded-lg bg-opacity-60">
            <CloudUploadOutlined
              style={{
              color: "#E1EFE6",
              fontSize: "3rem",
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full cursor-pointer opacity-0"
          />
          <Image
            src={banner}
            alt="Banner"
            style={bannerStyle}
            quality={100}
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="absolute top-[5rem] left-[1rem] w-28 h-28 lg:w-40 lg:h-40 lg:top-[8rem] lg:left-[2rem]">
          <div className="flex justify-center items-center absolute w-full h-full bg-black rounded-full bg-opacity-60">
            <CloudUploadOutlined
              style={{
              color: "#E1EFE6",
              fontSize: "3rem",
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full cursor-pointer opacity-0"
          />
          <Image
            src={image}
            alt="Profile"
            style={imageStyle}
            quality={100}
            width={500}
            height={500}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
