# watchitmove

![watching & moving](https://i.cloudup.com/hMvPbOuRSB.gif)

Copy a file to another location when it changes

## Install

Install globally

```
npm install -g watchitmove
```

## Start

In current working directory

```
watchitmove -f /var/log/system.log
```

Specify out path

```
watchitmove -f /var/log/system.log -o ~/dump
```

Custom watch interval (miliseconds)

```
watchitmove -f /var/log/system.log -o ~/dump -i 500
```

## Usage

```
watchitmove -h
```

## Bugs

[Use Github Issues](https://github.com/detj/watchitmove/issues)


## License

MIT
