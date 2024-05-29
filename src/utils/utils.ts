class Utils {
  public static formatDate(date: Date) {
    const year = String(date.getUTCFullYear());
    const mouth = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    const hour = String(date.getUTCHours()).padStart(2, "0");
    const minute = String(date.getUTCMinutes()).padStart(2, "0");
    const second = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}-${mouth}-${year} ${hour}:${minute}:${second}`;
  }
}

export default Utils;