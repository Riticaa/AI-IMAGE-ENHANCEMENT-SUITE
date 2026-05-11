import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ReactCompareImage from "react-compare-image";
import { motion } from "framer-motion";

import {
  FaUpload,
  FaDownload,
  FaMagic,
  FaSun,
  FaBrush,
  FaExpand,
  FaFilter,
  FaImage,
  FaBolt,
  FaShieldAlt,
  FaStar,
  FaRocket,
} from "react-icons/fa";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setEnhanced(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const enhanceImage = async (endpoint) => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/${endpoint}/`,
        formData,
        {
          responseType: "blob",
        }
      );

      const imageBlob = new Blob([response.data], {
        type: "image/png",
      });

      const imageUrl = URL.createObjectURL(imageBlob);

      setEnhanced(imageUrl);
    } catch (error) {
      console.log(error);
      alert("Enhancement failed");
    }

    setLoading(false);
  };

  const buttonStyle = {
    padding: "16px 24px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(168,85,247,0.18))",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(59,130,246,0.25), transparent 25%), radial-gradient(circle at bottom left, rgba(168,85,247,0.18), transparent 30%), linear-gradient(135deg, #020617 0%, #081226 50%, #0f172a 100%)",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          padding: "30px 60px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backdropFilter: "blur(12px)",
          zIndex: 100,
          background: "rgba(2,6,23,0.7)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            background: "linear-gradient(to right,#60a5fa,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Pixora
        </h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
            color: "#cbd5e1",
          }}
        >
          <span>Features</span>
          <span>How It Works</span>
          <span>AI Enhancement</span>
          <span>About</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          padding: "80px 60px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "30px",
            }}
          >
            <FaBolt color="#60a5fa" />
            <span>AI Powered Enhancement</span>
          </div>

          <h1
            style={{
              fontSize: "6rem",
              lineHeight: "0.95",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Your Images,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(to right,#60a5fa,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reimagined
            </span>
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.3rem",
              lineHeight: "1.8",
              maxWidth: "700px",
            }}
          >
            Pixora uses advanced AI technology to upscale, sharpen,
            restore, and enhance your images instantly. Transform blurry,
            low-quality photos into crystal-clear masterpieces in seconds.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
            }}
          >
            <button
              style={{
                padding: "18px 34px",
                borderRadius: "20px",
                border: "none",
                background:
                  "linear-gradient(to right,#3b82f6,#a855f7)",
                color: "white",
                fontWeight: "700",
                fontSize: "17px",
                cursor: "pointer",
                boxShadow: "0 20px 45px rgba(59,130,246,0.35)",
              }}
            >
              Start Enhancing
            </button>

            <button
              style={{
                padding: "18px 34px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "white",
                fontWeight: "700",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              Explore Features
            </button>
          </div>

          <div
            style={{
              marginTop: "45px",
              display: "flex",
              gap: "35px",
              flexWrap: "wrap",
              color: "#cbd5e1",
            }}
          >
            <span>🟢 AI Upscaling</span>
            <span>🟢 Noise Reduction</span>
            <span>🟢 Face Enhancement</span>
            <span>🟢 4K Quality</span>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "35px",
            padding: "40px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed rgba(96,165,250,0.35)",
              borderRadius: "30px",
              padding: "70px 30px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "40px",
            }}
          >
            <input {...getInputProps()} />

            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "28px",
                background:
                  "linear-gradient(to right,#3b82f6,#a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                marginBottom: "25px",
              }}
            >
              <FaUpload size={35} />
            </div>

            <h2
              style={{
                fontSize: "3rem",
                marginBottom: "15px",
              }}
            >
              Upload Your Image
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "1.1rem",
              }}
            >
              Drag & drop your image here or click to browse
            </p>
          </div>

          {preview && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <h3>Original</h3>

                <img
                  src={preview}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                  }}
                />
              </div>

              <div>
                <h3>Enhanced</h3>

                {enhanced ? (
                  <img
                    src={enhanced}
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <button
              style={buttonStyle}
              onClick={() => enhanceImage("denoise")}
            >
              <FaMagic />
              Denoise
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("brightness")}
            >
              <FaSun />
              Brightness
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("sharpen")}
            >
              <FaBrush />
              Sharpen
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("super-resolution")}
            >
              <FaExpand />
              Super Resolution
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("background-remove")}
            >
              <FaImage />
              Background Remove
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("hdr-filter")}
            >
              <FaFilter />
              HDR Filter
            </button>

            <button
              style={buttonStyle}
              onClick={() => enhanceImage("face-enhance")}
            >
              <FaStar />
              Face Enhance
            </button>
          </div>

          {loading && (
            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Enhancing your image with AI...
            </div>
          )}

          {enhanced && (
            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <a href={enhanced} download="enhanced-image.png">
                <button
                  style={{
                    padding: "14px 30px",
                    borderRadius: "16px",
                    border: "none",
                    background:
                      "linear-gradient(to right,#3b82f6,#a855f7)",
                    color: "white",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  <FaDownload />
                  &nbsp; Download Image
                </button>
              </a>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "100px 60px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "4rem",
            marginBottom: "20px",
          }}
        >
          Why Choose Pixora?
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            maxWidth: "900px",
            margin: "auto",
            marginBottom: "70px",
            lineHeight: "1.8",
          }}
        >
          Built with powerful AI models to restore image quality,
          sharpen details, remove noise, and upscale low-resolution
          photos into stunning visuals.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
          {
  [
    {
      title: "Lightning Fast",
      desc: "Enhance images within seconds using optimized AI processing.",
      icon: <FaBolt />,
    },
    {
      title: "Secure Processing",
      desc: "Your uploaded images stay protected and private.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Face Restoration",
      desc: "Restore blurry portraits and improve facial details.",
      icon: <FaMagic />,
    },
    {
      title: "AI Upscaling",
      desc: "Increase image resolution without losing quality.",
      icon: <FaExpand />,
    },
  ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              style={{
                padding: "40px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
  style={{
    width: "70px",
    height: "70px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#2563eb,#a855f7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    marginBottom: "28px",
    color: "white",
    boxShadow: "0 15px 35px rgba(59,130,246,0.35)",
  }}
>
  {item.icon}
</div>

              <h2>{item.title}</h2>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.8",
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "100px 60px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "4rem",
            marginBottom: "70px",
          }}
        >
          Enhance Images in 3 Easy Steps
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "35px",
          }}
        >
          {[
            {
              step: "01",
              title: "Upload Image",
              image:
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
            },
            {
              step: "02",
              title: "AI Enhancement",
              image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            },
            {
              step: "03",
              title: "Download Result",
              image:
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                borderRadius: "30px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={item.image}
                alt=""
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "35px",
                }}
              >
                <h3
                  style={{
                    color: "#60a5fa",
                  }}
                >
                  {item.step}
                </h3>

                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "15px",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: "1.8",
                  }}
                >
                  Professional AI workflow powered by Pixora enhancement engine.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {enhanced && (
        <div
          style={{
            padding: "100px 60px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "4rem",
              marginBottom: "60px",
            }}
          >
            Before & After
          </h1>

          <div
            style={{
              maxWidth: "1200px",
              margin: "auto",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            <ReactCompareImage
              leftImage={preview}
              rightImage={enhanced}
            />
          </div>
        </div>
      )}

      <div
        style={{
          padding: "60px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "100px",
        }}
      >
        <h2>Pixora</h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Your Images, Reimagined
        </p>
      </div>

      <style>
        {`
          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            background:#020617;
          }

          button:hover{
            transform:translateY(-4px);
          }

          img{
            display:block;
          }

          @media(max-width:1000px){
            h1{
              font-size:3rem !important;
            }

            div[style*="grid-template-columns: 1fr 1fr"]{
              grid-template-columns:1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;