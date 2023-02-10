/**
 * <Latin>Mox = <UK>Soon
 * @description Time service
 * @version 1.0.0
 */
class Mox {
  static date = new Date();
  static today = new Date().setHours(0, 0, 0, 0) / 1000;
  static yesterday: number = this.today - 86400;
  static tomorrow: number = this.today + 86400;
  declare timer: number; // timer

  static get now(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Get current timestamp with 10 digits
   * @returns {number} Timestamp
   */
  static formatStamp(t: number): number {
    while (t >= 10000000000) t /= 10;
    return Math.floor(t);
  }

  // start() {
  //   this.now = Math.floor(Date.now() / 1000);
  //   this._timer = setInterval(() => {
  //     this.now = Math.floor(Date.now() / 1000);
  //   }, 1000);
  // }

  // stop() { clearInterval(this._timer); }

  static isYesterday(date: Date | string | number): boolean {
    if (typeof date === 'string') {
      date = parseInt(date) ?? new Date(date).getTime();
    }
    if (
      !(date instanceof Date) && !(typeof date === 'string') &&
      !(typeof date === 'number')
    ) {
      return false;
    }
    if (date instanceof Date) date = date.getTime();
    if (date >= 10000000000) date = this.formatStamp(date);

    if (date >= 10000000000 && date <= 10000000000) {
      throw new Error('Invalid timestamp');
    }
    return Math.floor(date) < this.today &&
      Math.floor(date) >= this.today - 86400;
  }

  /**
   * Formatted  date with format YYYY-MM-DD
   * @returns {string}
   */
  static getformattedDate(): string {
    return `${this.date.getFullYear()}-${this.date.getMonth() + 1
      }-${this.date.getDate()}`;
  }

  /**
   * Formatted time with format HH:MM:SS
   * @returns {string}
   */
  static getFormattedTime(): string {
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    const seconds = this.date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Formatted date and time with format YYYY-MM-DD HH:MM:SS
   * @returns {string}
   */
  static getFormattedDateTime(): string {
    return `${this.getformattedDate()} ${this.getFormattedTime()}`;
  }
}

export { Mox }
