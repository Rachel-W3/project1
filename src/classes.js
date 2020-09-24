class FluidParticle {
    constructor(angle, xPos, yPos, color, maxAcceleration) {
        this.angle = angle;
        this.xPos = xPos;
        this.yPos = yPos,
        this.color = color;

        this.acceleration = 0;
        this.velocity = 0;
        this.maxAcceleration = 3.5;
        Object.seal(this);
    }

    updateParticle() {
        if(this.acceleration > this.maxAcceleration) this.acceleration = this.maxAcceleration;
        if(this.acceleration < -this.maxAcceleration) this.acceleration = -this.maxAcceleration;
        this.velocity += this.acceleration;
        this.yPos += this.velocity;
        this.acceleration = 0;
    }

    onImpact(impulse) {
        this.velocity += impulse;
    }
}

class Rock {
    constructor(xPos, yPos, radius, mass, color='red') {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.mass = mass;
        this.color = color;

        this.maxVelocity = 20;
        this.velocity = 0;
        this.acceleration = 0.2;
        this.isActive = true;
        Object.seal(this);
    }

    drop() {
        this.velocity += this.acceleration * (document.querySelector("#myGravity").value);
        if (this.velocity > this.maxVelocity) this.velocity = this.maxVelocity; // cap the fall speed
        this.yPos += this.velocity;
    }
}