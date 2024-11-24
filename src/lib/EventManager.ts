export class EventManager {
  eventType = EventManager.eventType;
  type = this.eventType.EVENT_NONE;
  endTime = 0;
  waiting = false;
  machinegunSwitch = false;
  railSwitch = false;
  warshipsLeft = 3;
  warshipsEscaped = 0;
  warshipsDestroyed = 0;
  setType(event_type: EventManager.eventType) {
    this.type = event_type;
    if (this.isSpaceWars()) {
      $("#pfText").css({
        "-webkit-filter": "brightness(100%)",
      });
      $("#pfArrow").css({
        "-webkit-filter": "brightness(100%)",
      });
    } else {
      $("#pfText").css({
        "-webkit-filter": "brightness(0%)",
      });
      $("#pfArrow").css({
        "-webkit-filter": "brightness(0%)",
      });
    }
    if (this.isWarship()) {
      this.warshipsLeft = 3;
      this.warshipsEscaped = this.warshipsDestroyed = 0;
    }
  }
  isInEvent() {
    return this.type != this.eventType.EVENT_NONE && !this.waiting;
  }
  isInstagib() {
    return this.type == this.eventType.EVENT_INSTAGIB && !this.waiting;
  }
  isSpaceWars() {
    return this.type == this.eventType.EVENT_SPACEWARS && !this.waiting;
  }
  isWarship() {
    return this.type == this.eventType.EVENT_WARSHIP && !this.waiting;
  }
  getEventName() {
    if (this.type == this.eventType.EVENT_INSTAGIB) {
      return "SUDDEN DEATH";
    } else if (this.type == this.eventType.EVENT_SPACEWARS) {
      return "SPACE WARS";
    } else if (this.type == this.eventType.EVENT_WARSHIP) {
      return "WARSHIP ATTACK";
    } else {
      return "NEW EVENT";
    }
  }
  getEventColor() {
    return this.type == this.eventType.EVENT_SPACEWARS ? "#FF3300" : "#fe6800";
  }
  setWarshipInfo(
    warshipsLeft: number,
    warshipsDestroyed: number,
    warshipsEscaped: number,
  ) {
    this.warshipsLeft = warshipsLeft;
    this.warshipsDestroyed = warshipsDestroyed;
    this.warshipsEscaped = warshipsEscaped;
  }
}
export namespace EventManager {
  export enum eventType {
    EVENT_NONE,
    EVENT_WAITING,
    EVENT_WARSHIP,
    EVENT_INSTAGIB,
    EVENT_GLADIATOR,
    EVENT_SPACEWARS,
  }
}
