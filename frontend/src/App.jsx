import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ReactCompareImage from "react-compare-image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

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
  const [loadingText, setLoadingText] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
  const handleClickOutside = () => {
    setActiveMenu(null);
  };

  if (activeMenu) {
    document.addEventListener("click", handleClickOutside);
  }

  return () => {
    document.removeEventListener(
      "click",
      handleClickOutside
    );
  };
}, [activeMenu]);

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

const loadingSteps = [
  "Analyzing image with AI...",
  "Restoring damaged details...",
  "Enhancing sharpness...",
  "Upscaling resolution...",
  "Finalizing enhancement...",
];

let step = 0;

const interval = setInterval(() => {
  setLoadingText(loadingSteps[step]);
  step = (step + 1) % loadingSteps.length;
}, 1200);

    try {
      const response = await axios.post(
        `https://riticaa-ai-image-enhancement-suite.hf.space/${endpoint}/`,
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
      clearInterval(interval);
setLoading(false);
    } catch (error) {
      
      console.log(error);
      alert("Enhancement failed");
    }

   clearInterval(interval);
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
        position: "relative",
overflow: "hidden",
      }}
    >
      {/* FLOATING BACKGROUND GLOWS */}

<div
  style={{
    position: "fixed",
    top: "-200px",
    right: "-150px",
    width: "500px",
    height: "500px",
    background: "rgba(59,130,246,0.18)",
    filter: "blur(140px)",
    borderRadius: "50%",
    zIndex: 0,
    animation: "floatGlow 8s ease-in-out infinite",
  }}
/>

<div
  style={{
    position: "fixed",
    bottom: "-250px",
    left: "-150px",
    width: "550px",
    height: "550px",
    background: "rgba(168,85,247,0.16)",
    filter: "blur(150px)",
    borderRadius: "50%",
    zIndex: 0,
    animation: "floatGlowTwo 10s ease-in-out infinite",
  }}
/>

<div
  style={{
    position: "fixed",
    top: "40%",
    left: "35%",
    width: "350px",
    height: "350px",
    background: "rgba(96,165,250,0.10)",
    filter: "blur(120px)",
    borderRadius: "50%",
    zIndex: 0,
    animation: "floatGlowThree 12s ease-in-out infinite",
  }}
/>
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
         <div
  onClick={(e) => {
  e.stopPropagation();
    setActiveMenu(activeMenu === "features" ? null : "features")
  }}
  style={{ cursor: "pointer" }}
>
  Features
</div>
<a href="#how-it-works">How It Works</a>
<a href="#ai-enhancement">AI Enhancement</a>

<a href="#about">About</a>
{activeMenu && (
  <div
  onClick={(e) => e.stopPropagation()}
    style={{
  position: "absolute",
  top: "85px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "650px",
  background: "rgba(10,15,35,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "28px 35px",
  color: "white",
  zIndex: 1000,
  boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
  backdropFilter: "blur(14px)",
}}
  >
    {activeMenu === "features" && (
  <div>
    
    <h2 style={{ marginBottom: "18px", color: "#8b5cf6" }}>
      Features
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px",
        lineHeight: "1.8",
      }}
    >
      <div> AI Image Upscaling</div>
      <div> Smart Noise Reduction</div>
      <div> HDR & Color Correction</div>
      <div> Face Restoration</div>
      <div> Background Removal</div>
      <div> Fast AI Processing</div>
    </div>
  </div>
)}


  </div>
)}
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
        <div id>
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
  onClick={(e) => {
  e.stopPropagation();
    document
      .getElementById("upload-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  style={{
    padding: "22px 50px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.3rem",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #4f8cff, #b04dff)",
    color: "white",
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
            <div id="upload-section">
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      width: "100%",
      padding: "50px",
      marginTop: "40px",
      borderRadius: "30px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      textAlign: "center",
      backdropFilter: "blur(20px)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    }}
  >
    <div
      style={{
        width: "90px",
        height: "90px",
        margin: "auto",
        borderRadius: "50%",
        border: "6px solid rgba(255,255,255,0.12)",
        borderTop: "6px solid #60a5fa",
        animation: "spin 1s linear infinite",
      }}
    />

    <h2
      style={{
        marginTop: "35px",
        fontSize: "2.3rem",
        fontWeight: "700",
      }}
    >
      Enhancing with Pixora AI
    </h2>

    <p
      style={{
        color: "#94a3b8",
        marginTop: "18px",
        fontSize: "1.15rem",
      }}
    >
      {loadingText}
    </p>

    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "12px",
        margin: "35px auto 0",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "999px",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 5 }}
        style={{
          height: "100%",
          background:
            "linear-gradient(to right,#2563eb,#60a5fa,#a855f7)",
          borderRadius: "999px",
        }}
      />
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        marginTop: "35px",
        flexWrap: "wrap",
      }}
    >
      {[
        "AI Restoration",
        "Face Recovery",
        "Noise Reduction",
        "4K Upscaling",
      ].map((item, index) => (
        <div
          key={index}
          style={{
            padding: "12px 20px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#cbd5e1",
            fontSize: "0.95rem",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </motion.div>
)}

            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Enhancing your image with AI...
            </div>
          
          

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



{/* STATS SECTION */}

<div
  style={{
    padding: "100px 60px",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "30px",
    }}
  >
    {[
      {
        number: "10K+",
        title: "Images Enhanced",
      },

      {
        number: "99%",
        title: "User Satisfaction",
      },

      {
        number: "4K",
        title: "AI Upscaling",
      },

      {
        number: "24/7",
        title: "AI Processing",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "50px 30px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "15px",
            background: "linear-gradient(90deg,#60a5fa,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {item.number}
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.1rem",
          }}
        >
          {item.title}
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

{/* AI SHOWCASE SECTION */}

<div
  style={{
    padding: "120px 60px",
  }}
>
  <div
    style={{
      textAlign: "center",
      marginBottom: "80px",
    }}
  >
    <h1
      style={{
        fontSize: "4.5rem",
        marginBottom: "20px",
        fontWeight: "800",
      }}
    >
      AI Enhancement Showcase
    </h1>

    <p
      style={{
        color: "#94a3b8",
        maxWidth: "900px",
        margin: "auto",
        lineHeight: "1.9",
        fontSize: "1.15rem",
      }}
    >
      Pixora intelligently restores blurry, damaged, noisy, and
      low-quality images using advanced AI enhancement models.
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: "35px",
    }}
  >
    {[
      {
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        title: "AI Portrait Restoration",
      },
      {
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        title: "4K Image Upscaling",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        title: "AI Face Enhancement",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{
          y: -10,
          scale: 1.02,
        }}
        style={{
          borderRadius: "32px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={item.image}
          alt=""
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "14px",
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
            Professional AI enhancement powered by Pixora technology.
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</div>

{/* BEFORE AFTER AI DEMO SECTION */}

<div
  style={{
    padding: "120px 60px",
  }}
>
  <div
    style={{
      textAlign: "center",
      marginBottom: "70px",
    }}
  >
    <h1
      style={{
        fontSize: "4rem",
        fontWeight: "800",
        marginBottom: "20px",
      }}
    >
      AI Transformation Results
    </h1>

    <p
      style={{
        color: "#94a3b8",
        maxWidth: "850px",
        margin: "auto",
        lineHeight: "1.8",
        fontSize: "1.1rem",
      }}
    >
      Experience the power of Pixora AI restoration with
      real before-and-after image transformations.
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(420px,520px))",
justifyContent: "center",
      gap: "50px",
    }}
  >
    {[
      {
        before: "/old-after.png",
        after: "/old-before.png",
        title: "Vintage Photo Restoration",
      },

      {
        before: "/woman-after.png",
        after: "/woman-before.png",
        title: "Damaged Portrait Recovery",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{
          y: -8,
          scale: 1.01,
        }}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          padding: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "12px",
          }}
        >
          {item.title}
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "25px",
            lineHeight: "1.7",
          }}
        >
          Drag the slider to compare original and AI-enhanced image.
        </p>

        <div
  style={{
    borderRadius: "24px",
    overflow: "hidden",
    height: "380px",
  }}
>
          <ReactCompareImage
  leftImage={item.before}
  rightImage={item.after}
  sliderLineWidth={3}
  handleSize={55}
  aspectRatio="wider"
/>
        </div>
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
    maxWidth: "750px",
    height: "450px",
    margin: "auto",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
  }}
>
            <ReactCompareImage
  leftImage={preview}
  rightImage={enhanced}
  aspectRatio="wider"
  sliderLineWidth={3}
  handleSize={50}
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
            @keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

          @media(max-width:1000px){
            h1{
              font-size:3rem !important;
            }

            div[style*="grid-template-columns: 1fr 1fr"]{
              grid-template-columns:1fr !important;
            }
          }
            @keyframes floatGlow {
  0% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(40px) translateX(-20px);
  }

  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes floatGlowTwo {
  0% {
    transform: translateY(0px) translateX(0px);
  }

  50% {
    transform: translateY(-30px) translateX(30px);
  }

  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes floatGlowThree {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1);
  }
}
        `}

        
      </style>
      
     

<div
  id="how-it-works"
  style={{
    padding: "120px 60px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "4rem",
      marginBottom: "20px",
    }}
  >
    How It Works
  </h1>

  <p
    style={{
      color: "#9aa4bf",
      marginBottom: "70px",
      fontSize: "1.2rem",
    }}
  >
    Enhance your images in 3 simple steps
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
    }}
  >
    {[
      "Upload Your Image",
      "AI Enhances It",
      "Download Result",
    ].map((step, index) => (
      <div
        key={index}
        style={{
          width: "280px",
          padding: "40px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          {index + 1}
        </h1>

        <h2>{step}</h2>
      </div>
    ))}
  </div>
</div>

<div
  id="ai-enhancement"
  style={{
    padding: "120px 60px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "4rem",
      marginBottom: "30px",
    }}
  >
    AI Enhancement
  </h1>

  <p
    style={{
      maxWidth: "950px",
      margin: "auto",
      color: "#9aa4bf",
      fontSize: "1.2rem",
      lineHeight: "2",
    }}
  >
    Pixora uses advanced AI models like GFPGAN,
    Real-ESRGAN and OpenCV-powered enhancement
    pipelines to restore blurry images, sharpen
    details, upscale low-quality photos and improve
    facial clarity automatically using deep learning.
  </p>
</div>

<div
  id="about"
  style={{
    padding: "120px 60px",
    textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "4rem",
      marginBottom: "30px",
    }}
  >
    About Pixora
  </h1>

  <p
    style={{
      maxWidth: "950px",
      margin: "auto",
      color: "#9aa4bf",
      fontSize: "1.2rem",
      lineHeight: "2",
    }}
  >
    Pixora is a modern AI-powered image enhancement
    platform built using React, FastAPI, OpenCV,
    GFPGAN and Real-ESRGAN. It enables users to
    enhance, restore and upscale images with
    professional-quality AI processing directly from
    the browser.
  </p>
</div>

    </div>
  );
}

export default App;