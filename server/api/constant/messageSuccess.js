const messages = {
  SUCCESS_CREATE_DATA: {
    vi: "Thêm mới dữ liệu thành công",
    en: "Add new data successfuly"
  }
}

export function getMessage(messageKey, lang_id) {
  if (messageKey && messages[messageKey] && messages[messageKey][lang_id]) {
    return messages[messageKey][lang_id]
  } else {
    return messageKey
  }
}