class FluidParticle {
    constructor(angle, xPos, color) {
        this.angle = angle;
        this.xPos = xPos;
        this.color = color;

        this.acceleration = 0;
        this.velocity = 0;
        this.speed = 50.0; // oscillation speed
        this.b = 0.05; // dampening constant
        Object.seal(this);
    }

    OnImpact(impulse) {
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
        this.acceleration = 0.5;
        this.isActive = true;
        Object.seal(this);
    }

    drop() {
        this.velocity += this.acceleration * (document.querySelector("#myGravity").value);
        if (this.velocity > this.maxVelocity) this.velocity = this.maxVelocity; // cap the fall speed
        if (this.yPos > canvasHeight) this.isActive = false; // this rock will later be deleted from the list
        this.yPos += this.velocity;
    }
}