package com.retypeme.project.chain.provider;

public enum Chain {
    POLYGON_MUMBAI(80001, "polygon-mumbai"),
    SEPOLIA(31337, "sepolia");

    public static Chain lookup(String chain) {
        return switch (chain) {
            case "polygon-mumbai" -> POLYGON_MUMBAI;
            case "sepolia" -> SEPOLIA;
            default -> throw new IllegalArgumentException("Unknown chain: " + chain);
        };
    }

    private final int id;
    private final String name;

    Chain(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
