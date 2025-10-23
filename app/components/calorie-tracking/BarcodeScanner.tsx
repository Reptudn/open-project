import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeColors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface BarcodeScannerProps {
  isVisible: boolean;
  onClose: () => void;
  onBarcodeScanned: (barcode: string) => void;
}

export default function BarcodeScanner({
  isVisible,
  onClose,
  onBarcodeScanned,
}: BarcodeScannerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    if (isVisible && !permission?.granted) {
      requestPermission();
    }
  }, [isVisible, permission?.granted, requestPermission]);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    setScanned(true);
    console.log(`Barcode scanned: Type: ${type}, Data: ${data}`);
    onBarcodeScanned(data);

    setTimeout(() => {
      onClose();
      setScanned(false);
    }, 1000);
  };

  const resetScanner = () => {
    setScanned(false);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Modal visible={isVisible} animationType="slide">
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDark
                ? ThemeColors.dark.background
                : ThemeColors.light.background,
            },
          ]}
        >
          <View style={styles.permissionContainer}>
            <Ionicons
              name="camera-outline"
              size={64}
              color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            />
            <Text
              style={[
                styles.permissionText,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                },
              ]}
            >
              Camera permission is required to scan barcodes
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isDark
                    ? ThemeColors.dark.button
                    : ThemeColors.light.button,
                },
              ]}
              onPress={requestPermission}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
                  },
                ]}
              >
                Grant Permission
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
              "code39",
              "code128",
              "qr",
            ],
          }}
          enableTorch={torch}
        />

        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.closeIconButton} onPress={onClose}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Scanning area */}
          <View style={styles.scanArea}>
            <View style={styles.scanBox}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          {/* Bottom instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              {scanned ? "Barcode Scanned!" : "Point camera at a barcode"}
            </Text>
            {scanned && (
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={resetScanner}
              >
                <Text style={styles.scanAgainText}>Scan Again</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => setTorch(!torch)}
            >
              {torch ? (
                <Ionicons name="flash-off" size={30} color="white" />
              ) : (
                <Ionicons name="flash" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeIconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 150,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "white",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  instructions: {
    alignItems: "center",
    paddingBottom: 100,
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  scanAgainButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scanAgainText: {
    color: "black",
    fontWeight: "bold",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ff4444",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
