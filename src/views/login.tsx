import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../resources/colors";

import { auth } from "../../credenciales";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // json:
      //{"_tokenResponse":
      // {
      //   "displayName": "",
      //   "email": "juan.bellavitis@gmail.com",
      //   "expiresIn": "3600",
      //   "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkNjE3N2E5Mjg2ZDI1Njg0NTI2OWEzMTM2ZDNmNjY0MjZhNGQ2NDIiLCJ0eXAiOiJKV1QifQ.ey
      //   Jpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2hyb25vbWV0ZXItYTk3MmIiLCJhdWQiOiJjaHJvbm9tZXRlci1hOTcyYiIsImF1dGhfdGltZSI6MTcxNzM2MzY
      //   0NCwidXNlcl9pZCI6ImtRMHMwY3F0VGhhYXJGcXNLVlN5N0VLZXM5TDIiLCJzdWIiOiJrUTBzMGNxdFRoYWFyRnFzS1ZTeTdFS2VzOUwyIiwiaWF0IjoxNzE3MzYzNjQ0LCJleHAiOjE3MTcz
      //   NjcyNDQsImVtYWlsIjoianVhbi5iZWxsYXZpdGlzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqdWFuLmJlbGxhdm
      //   l0aXNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.G1gpVT2x2imuYqHOzKqNGWOQJla3QYAX8zW1zmJahevbMmtmPmIcvQoTgn76cAJEoH2kI96CyaNVOkowVNTBc5N
      //   oiaU6MuaeRFu9eFYrOlWU3f08I4tpGoLEQij_FlnC-W2UnoaNgkYetumh39ebsSpV1oOX4Kxsm6_joOb120vBxHhxURQ5ZtjwNWsScamQJp2RV8zBjvD5Q-05V4IxkG_4Iu0pZe3mm1tXTGpdp64J3snGA
      //   vqsJZUqX4m7flz5k3jMPmynm2XaVHBmKa6OS92MeSj-FWzAP-hO0kfIXPl-8O_P7sCAguCx8uhji-EMAHfhuJlV3dJxwZPBRKfDuA",
      //   "kind": "identitytoolkit#VerifyPasswordResponse",
      //   "localId": "kQ0s0cqtThaarFqsKVSy7EKes9L2",
      //   "refreshToken": "AMf-vBwN2PFTHBhYjB0mRtBP-8qNg7InLXP0ifG72VPMOcRPnOnpmtZU0eTnkS-JeAXyLrx_tnp6IE80k_sznzuD6875QZIWJ8CsHptRnE6Tpjv2KhMYJb5k-u9D2yXP1
      //   _kWJQHUDGtVg59QEbA0zzQnuAYx4IMlMaP8Xczb4u77QWQkfbpI4aF6Wo5AePQaqxG8H1JEE88Vyk3kj7DGpgpcLKKJiRDH390gCootKfDv9n7LoIFDqzM",
      //   "registered": true},
      //  "operationType":
      //  "signIn",
      //  "providerId": null,
      //  "user": {
      //     "_redirectEventId": undefined,
      //     "apiKey": "AIzaSyB2VftK56kGiY3_3_XDs_hBikxj8ykr0zI",
      //     "appName": "[DEFAULT]",
      //     "createdAt": "1717358226428",
      //     "displayName": undefined,
      //     "email": "juan.bellavitis@gmail.com",
      //     "emailVerified": false,
      //     "isAnonymous": false,
      //     "lastLoginAt": "1717363644391",
      //     "phoneNumber": undefined,
      //     "photoURL": undefined,
      //     "providerData": [Array],
      //     "stsTokenManager": [Object],
      //     "tenantId": undefined,
      //     "uid":
      //     "kQ0s0cqtThaarFqsKVSy7EKes9L2"
      //   }
      //}
      Alert.alert("Sesión iniciada con éxito");
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "El usuario o la contraseña son incorrectos.");
    }
  };

  return (
    <View style={styles.padre}>
      <View>
        <Image
          source={require("../../assets/Gandalf.png")}
          style={styles.profile}
        />
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Email"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View style={styles.cajaTexto}>
          <TextInput
            secureTextEntry
            placeholder="Contraseña"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <View style={styles.padreBotton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={login}>
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.white,
  },
  tarjeta: {
    margin: 20,
    backgroundColor: colors.middleGray,
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cajaTexto: {
    paddingVertical: 10,
    backgroundColor: "#eff2ef",
    borderRadius: 30,
    marginVertical: 10,
  },
  padreBotton: {
    alignItems: "center",
  },
  cajaBoton: {
    backgroundColor: "#525FE1",
    borderRadius: 30,
    paddingVertical: 10,
    width: 150,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: "center",
    color: colors.white,
  },
});

export default Login;
