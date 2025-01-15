import axios from "axios"
import { getItemAsync } from "expo-secure-store"

const commonURL = process.env.API_URL

export const GetFixes = async () => {
  const baseURL = commonURL + "/fixes"
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (err) {
    return err
  }
}

export const EditFixes = async (item) => {
  const baseURL = commonURL + "/admin/fixes"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const LoginGoogle = async (item) => {
  const baseURL = commonURL + "/logingoogle"
  try {
    const response = await axios.put(baseURL, item)
    return response.data
  } catch (err) {
    return err
  }
}

export const RegisterGoogle = async (item) => {
  const baseURL = commonURL + "/logingoogle"
  try {
    const response = await axios.post(baseURL, item)
    return response.data
  } catch (err) {
    return err
  }
}

export const LoginManual = async (item) => {
  const baseURL = commonURL + "/login"
  try {
    const response = await axios.put(baseURL, item)
    return response.data
  } catch (err) {
    return err
  }
}

export const RefreshToken = async () => {
  const baseURL = commonURL + "/wait/refresh"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const GetOverall = async () => {
  const baseURL = commonURL + "/mech/overall"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const EditWork = async (item) => {
  const baseURL = commonURL + "/mech/editwork"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const RecFromSchedule = async (item) => {
  const baseURL = commonURL + "/mech/receive"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const RecFromScratch = async (item) => {
  const baseURL = commonURL + "/mech/receive"
  const token = await getItemAsync("token")
  try {
    const response = await axios.post(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const FinishWorking = async (item) => {
  const baseURL = commonURL + "/mech/finishwork"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const ReturnCar = async (item) => {
  const baseURL = commonURL + "/mech/return"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const NewSchedule = async (item) => {
  const baseURL = commonURL + "/mech/schedule"
  const token = await getItemAsync("token")
  try {
    const response = await axios.post(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const QRcodeGenerate = async (item) => {
  const baseURL = commonURL + "/mech/qrcode"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const LPR = async (item) => {
  const baseURL = commonURL + "/mech/lpr"
  const token = await getItemAsync("token")
  try {
    const response = await axios.post(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const GetCars = async () => {
  const baseURL = commonURL + "/mech/carinfo"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const GetSchedule = async () => {
  const baseURL = commonURL + "/mech/schedule"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const PostSchedule = async (item) => {
  const baseURL = commonURL + "/mech/schedule"
  const token = await getItemAsync("token")
  try {
    const response = await axios.post(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const GetHistory = async () => {
  const baseURL = commonURL + "/mech/history"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const Pay = async (item) => {
  const baseURL = commonURL + "/mech/pay"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const Profile = async () => {
  const baseURL = commonURL + "/private/profile"
  const token = await getItemAsync("token")
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}

export const EditProfile = async (item) => {
  const baseURL = commonURL + "/private/profile"
  const token = await getItemAsync("token")
  try {
    const response = await axios.put(baseURL, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err
  }
}
