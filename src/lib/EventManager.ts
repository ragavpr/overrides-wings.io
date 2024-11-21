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
    this.isSpaceWars()
      ? ($("#pfText").css({
          "-webkit-filter": "brightness(100%)",
        }),
        $("#pfArrow").css({
          "-webkit-filter": "brightness(100%)",
        }))
      : ($("#pfText").css({
          "-webkit-filter": "brightness(0%)",
        }),
        $("#pfArrow").css({
          "-webkit-filter": "brightness(0%)",
        }));
    this.isWarship() &&
      ((this.warshipsLeft = 3),
      (this.warshipsEscaped = this.warshipsDestroyed = 0));
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
    return this.type == this.eventType.EVENT_INSTAGIB
      ? "SUDDEN DEATH"
      : this.type == this.eventType.EVENT_SPACEWARS
        ? "SPACE WARS"
        : this.type == this.eventType.EVENT_WARSHIP
          ? "WARSHIP ATTACK"
          : "NEW EVENT";
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
